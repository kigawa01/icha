import os
from datetime import timedelta

import dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

dotenv.load_dotenv()
app = Flask(__name__)

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

CORS(app, resources={"/api/*": {"origins": cors_list.split(",")}})
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['JSON_AS_ASCII'] = False
app.config["SECRET_KEY"] = os.getenv("LOGIN_SECRET")
app.config["JWT_SECRET_KEY"] = os.getenv("LOGIN_SECRET")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=4)

jwt = JWTManager(app)
db: SQLAlchemy = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)

# noinspection PyUnresolvedReferences
import icha.api
# noinspection PyUnresolvedReferences
import icha.model

from icha.cmd import job

app.cli.add_command(job)
