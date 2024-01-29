import logging
import os
from datetime import timedelta, datetime, timezone

import dotenv
from fastapi import FastAPI
from jose import jwt

from icha.util.logger_filter import ExcludeFilter

dotenv.load_dotenv()
app = FastAPI()

logging.getLogger("uvicorn.access").addFilter(ExcludeFilter(["/health"]))

cors_list = os.getenv("CORS_LIST")
if cors_list is None:
    cors_list = "*"

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    encode_data = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    encode_data.update({"exp": expire})
    encoded_jwt = jwt.encode(encode_data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# noinspection PyUnresolvedReferences
import icha.api
# noinspection PyUnresolvedReferences
# import icha.model

# from icha.cmd import job

# app.cli.add_command(job)
