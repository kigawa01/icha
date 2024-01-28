from dataclasses import dataclass

from pydantic import BaseModel


@dataclass
class LoginReq(BaseModel):
    email: str
    password: str
