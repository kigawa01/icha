from dataclasses import dataclass

from pydantic import BaseModel


@dataclass
class LoginReq(BaseModel):
    email: str
    password: str


class Tokens(BaseModel):
    access_token: str
    refresh_token: str


class PostUserBody(BaseModel):
    name: str
    email: str
    password: str


class UserRes(BaseModel):
    name: str
    email: str
    uid: int
