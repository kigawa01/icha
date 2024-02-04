from datetime import timedelta, datetime, timezone

from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import BaseModel

from app import ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM, REFRESH_TOKEN_EXPIRE_MINUTES
from icha.data import Token, TokensRes
from icha.table.table import UserTable

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_token(user_id: int, token_type: str = "access", expires_delta: timedelta | None = None):
    expire = datetime.now(timezone.utc) + expires_delta
    encoded_jwt = jwt.encode(
        TokenData.from_args(exp=expire, user_id=user_id, token_type=token_type).model_dump(),
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return Token.from_args(encoded_jwt, expire)


def create_refresh_token(user_id: int):
    return create_token(user_id, "refresh", expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))


def create_access_token(user_id: int):
    return create_token(user_id, "access", timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))


def get_tokens(user: UserTable):
    return TokensRes.from_args(
        access_token=create_access_token(user.uid),
        refresh_token=create_refresh_token(user.uid)
    )


class TokenData(BaseModel):
    exp: datetime
    token_type: str
    user_id: int

    @staticmethod
    def from_args(exp: datetime, token_type: str, user_id: int):
        return TokenData(exp=exp, token_type=token_type, user_id=user_id)
