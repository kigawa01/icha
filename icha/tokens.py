from datetime import timedelta, datetime, timezone

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession

from app import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, REFRESH_TOKEN_EXPIRE_MINUTES
from icha import data
from icha.data import TokenData, TokensRes
from icha.env import SECRET_KEY
from icha.error import ErrorIdException, ErrorIds
from icha.repo import user_repo
from icha.table import UserTable, get_session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/refresh", auto_error=False)


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


def get_token_or_none(token: str | None = Depends(oauth2_scheme)):
    if token is None:
        return None
    return data.JwtTokenData(**jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]))


def get_token(token: data.JwtTokenData | None = Depends(get_token_or_none)):
    if token is None:
        raise ErrorIdException(ErrorIds.UNAUTHORIZED)
    return token


def access_token_or_none(token: data.JwtTokenData | None = Depends(get_token_or_none)):
    if token is None:
        return None
    if token.token_type != "access":
        raise ErrorIdException(ErrorIds.INVALID_TOKEN)
    return token


async def get_login_user_or_none(
        session: AsyncSession = Depends(get_session),
        token: data.JwtTokenData | None = Depends(access_token_or_none)
):
    if token is None:
        return None
    user = await user_repo.by_token(session, token)
    await session.refresh(user)
    return user


async def get_login_user(
        user: UserTable | None = Depends(get_login_user_or_none)
) -> UserTable:
    if user is None:
        raise ErrorIdException(ErrorIds.UNAUTHORIZED)
    return user
