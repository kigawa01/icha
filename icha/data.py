from datetime import datetime

from pydantic import BaseModel


class LoginBody(BaseModel):
    email: str
    password: str

    @staticmethod
    def from_args(email: str, password: str):
        return LoginBody(email=email, password=password)


class Token(BaseModel):
    token: str
    expires_in: datetime

    @staticmethod
    def from_args(token: str, expires_in: datetime) -> 'Token':
        return Token(token=token, expires_in=expires_in)


class TokensRes(BaseModel):
    access_token: Token
    refresh_token: Token

    @staticmethod
    def from_args(access_token: Token, refresh_token: Token):
        return TokensRes(access_token=access_token, refresh_token=refresh_token)


class PostUserBody(BaseModel):
    name: str
    email: str
    password: str

    @staticmethod
    def from_args(name: str, email: str, password: str) -> 'PostUserBody':
        return PostUserBody(name=name, email=email, password=password)


class UserRes(BaseModel):
    name: str
    email: str
    uid: int
