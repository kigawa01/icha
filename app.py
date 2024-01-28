import os
from datetime import timedelta, datetime, timezone

import dotenv
from fastapi import FastAPI
from jose import jwt
from pydantic import BaseModel

dotenv.load_dotenv()
app = FastAPI()

db_url = os.getenv("DB_URL")
db_user = os.getenv("DB_USER")
if db_user is None and db_url is None:
    raise ValueError("DB_USER must not be None")
db_pass = os.getenv("DB_PASS")
if db_pass is None and db_url is None:
    raise ValueError("DB_PASS must not be None")
db_host = os.getenv("DB_HOST")
if db_host is None:
    db_host = "localhost"
db_port = os.getenv("DB_PORT")
if db_port is not None:
    db_host = f"{db_host}:{db_port}"
db_name = os.getenv("DB_NAME")
if db_name is None:
    db_name = "icha"
if db_url is None:
    db_url = f"mysql+pymysql://{db_user}:{db_pass}@{db_host}/{db_name}"

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
