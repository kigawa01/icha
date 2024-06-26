from datetime import datetime

from pydantic import BaseModel


class JwtTokenData(BaseModel):
    exp: datetime
    token_type: str
    user_id: int

    @staticmethod
    def from_args(exp: datetime, token_type: str, user_id: int):
        return JwtTokenData(exp=exp, token_type=token_type, user_id=user_id)


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


class LoginBody(BaseModel):
    email: str
    password: str

    @staticmethod
    def from_args(email: str, password: str):
        return LoginBody(email=email, password=password)


class LoginRes(BaseModel):
    uid: int
    name: str
    email: str
    tokens: TokensRes

    @staticmethod
    def from_args(uid: int, name: str, email: str, tokens: TokensRes) -> 'LoginRes':
        return LoginRes(uid=uid, name=name, email=email, tokens=tokens)


class UserBody(BaseModel):
    name: str
    email: str
    password: str
    self_produce: str | None

    @staticmethod
    def from_args(name: str, email: str, password: str, self_produce: None) -> 'UserBody':
        return UserBody(name=name, email=email, password=password, self_produce=self_produce)


class UserPutBody(BaseModel):
    name: str
    email: str
    password: str | None
    self_produce: str | None


class UserRes(BaseModel):
    uid: int
    name: str
    email: str
    self_produce: str | None

    @staticmethod
    def from_args(
            uid: int,
            name: str,
            email: str,
            self_produce: str | None
    ):
        return UserRes(
            uid=uid,
            name=name,
            email=email,
            self_produce=self_produce
        )


class ImageFileData(BaseModel):
    base64: str
    name: str

    @staticmethod
    def create(name: str, base64: str):
        return ImageFileData(
            name=name, base64=base64
        )


class LicenceData(BaseModel):
    text: str
    business: str
    post: str
    credit: str
    distribution: str
    material: str

    @staticmethod
    def create(
            text: str,
            business: str,
            post: str,
            credit: str,
            distribution: str,
            material: str,
    ):
        return LicenceData(
            text=text,
            business=business,
            post=post,
            credit=credit,
            distribution=distribution,
            material=material
        )


class GachaContentBody(BaseModel):
    image: ImageFileData
    title: str
    description: str
    rate: int


class GachaContentRes(BaseModel):
    uid: int
    image: ImageFileData
    title: str
    description: str
    rate: int
    post_user_id: int
    pulled: bool

    @staticmethod
    def create(
            uid: int,
            image: ImageFileData,
            title: str,
            description: str,
            rate: int,
            pulled: bool,
            post_user_id: int
    ):
        return GachaContentRes(
            uid=uid,
            image=image,
            title=title,
            description=description,
            rate=rate,
            pulled=pulled,
            post_user_id=post_user_id
        )


class GachaBody(BaseModel):
    thumbnail: ImageFileData
    name: str
    description: str
    licence: LicenceData
    contents: list[GachaContentBody]

    @staticmethod
    def create(
            thumbnail: ImageFileData,
            name: str,
            description: str,
            licence: LicenceData,
            contents: list[GachaContentBody],
    ):
        return GachaBody(
            thumbnail=thumbnail,
            name=name,
            description=description,
            licence=licence.model_dump(),
            contents=contents,
        )


class GachaRes(BaseModel):
    uid: int
    thumbnail: ImageFileData
    name: str
    description: str
    licence: LicenceData
    contents: list[GachaContentRes]


class GachaListRes(BaseModel):
    uid: int
    thumbnail: ImageFileData
    name: str
    description: str
    licence: LicenceData
    creator: UserRes

    @staticmethod
    def create(
            uid: int,
            thumbnail: ImageFileData,
            name: str,
            description: str,
            licence: LicenceData,
            creator: UserRes
    ):
        return GachaListRes(
            uid=uid,
            thumbnail=thumbnail,
            name=name,
            description=description,
            licence=licence,
            creator=creator
        )


class PullGachaRes(BaseModel):
    content_id: int

    @staticmethod
    def create(
            content_id: int
    ):
        return PullGachaRes(
            content_id=content_id
        )
