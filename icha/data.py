from datetime import datetime

from pydantic import BaseModel


class LoginBody(BaseModel):
    email: str
    password: str

    @staticmethod
    def from_args(email: str, password: str):
        return LoginBody(email=email, password=password)


class TokenData(BaseModel):
    token: str
    expires_in: datetime

    @staticmethod
    def from_args(token: str, expires_in: datetime) -> 'TokenData':
        return TokenData(token=token, expires_in=expires_in)


class TokensRes(BaseModel):
    access_token: TokenData
    refresh_token: TokenData

    @staticmethod
    def from_args(access_token: TokenData, refresh_token: TokenData):
        return TokensRes(access_token=access_token, refresh_token=refresh_token)


class PostUserBody(BaseModel):
    name: str
    email: str
    password: str

    @staticmethod
    def from_args(name: str, email: str, password: str) -> 'PostUserBody':
        return PostUserBody(name=name, email=email, password=password)


class LoginRes(BaseModel):
    uid: int
    name: str
    email: str
    tokens: TokensRes

    @staticmethod
    def from_args(uid: int, name: str, email: str, tokens: TokensRes) -> 'LoginRes':
        return LoginRes(uid=uid, name=name, email=email, tokens=tokens)


class UserRes(BaseModel):
    uid: int
    name: str
    email: str

    @staticmethod
    def from_args(uid: int, name: str, email: str):
        return UserRes(uid=uid, name=name, email=email)


class ImageData(BaseModel):
    image_data: str
    name: str


class LicenceData(BaseModel):
    text: str
    business: bool | str
    post: bool | str
    credit: bool | str
    distribution: bool | str
    material: bool | str


class GachaContent(BaseModel):
    image: ImageData
    title: str
    description: str
    rate: int


class GachaBody(BaseModel):
    thumbnail: ImageData
    name: str
    description: str
    licence: LicenceData
    contents: list[GachaContent]
