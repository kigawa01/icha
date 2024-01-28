import os
from datetime import timedelta, datetime, timezone

import dotenv
from fastapi import FastAPI
from jose import jwt
from pydantic import BaseModel

dotenv.load_dotenv()
app = FastAPI()

cors_list = os.getenv("CORS_LIST")
if cors_list is None:
    cors_list = "*"

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15


class Token(BaseModel):
    access_token: str
    token_type: str


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    encode_data = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    encode_data.update({"exp": expire})
    encoded_jwt = jwt.encode(encode_data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# app.config['SQLALCHEMY_DATABASE_URI'] = db_url
# app.config['JSON_AS_ASCII'] = False
# app.config["SECRET_KEY"] =
# app.config["JWT_SECRET_KEY"] = os.getenv("LOGIN_SECRET")
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
# app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=4)

# jwt = JWTManager(app)
# db: SQLAlchemy = SQLAlchemy()
# db.init_app(app)
# migrate = Migrate(app, db)

# noinspection PyUnresolvedReferences
import icha.api
# noinspection PyUnresolvedReferences
# import icha.model

# from icha.cmd import job

# app.cli.add_command(job)
