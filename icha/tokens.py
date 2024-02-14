from datetime import timedelta, datetime, timezone
from typing import Coroutine, Any

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession

from app import ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM, REFRESH_TOKEN_EXPIRE_MINUTES
from icha import data
from icha.data import TokenData, TokensRes
from icha.error import ErrorIdException, ErrorIds
from icha.repo import user_repo
from icha.table import UserTable, get_session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/refresh")


def create_token(user_id: int, token_type: str = "access", expires_delta: timedelta | None = None):
    expire = datetime.now(timezone.utc) + expires_delta
    encoded_jwt = jwt.encode(
        data.JwtTokenData.from_args(exp=expire, user_id=user_id, token_type=token_type).model_dump(),
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return TokenData.from_args(encoded_jwt, expire)


def create_refresh_token(user_id: int):
    return create_token(user_id, "refresh", expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))


def create_access_token(user_id: int):
    return create_token(user_id, "access", timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))


def create_tokens(user: UserTable):
    return TokensRes.from_args(
        access_token=create_access_token(user.uid),
        refresh_token=create_refresh_token(user.uid)
    )


def get_token(token: str = Depends(oauth2_scheme)):
    return data.JwtTokenData(**jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]))


def access_token(token: data.JwtTokenData = Depends(get_token)):
    if token.token_type != "access":
        raise ErrorIdException(ErrorIds.INVALID_TOKEN)
    return token


def get_user(
        session: AsyncSession = Depends(get_session),
        token: data.JwtTokenData = Depends(access_token)
) -> Coroutine[Any, Any, UserTable]:
    return user_repo.by_token(session, token)
