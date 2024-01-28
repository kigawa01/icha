from dataclasses import dataclass

from pydantic import BaseModel


@dataclass
class Tokens(BaseModel):
    access_token: str
    refresh_token: str
