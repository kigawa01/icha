import os

import dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

dotenv.load_dotenv()

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

engine = create_engine(db_url, echo=True)

BaseTable = declarative_base()

BaseTable.metadata.create_all(bind=engine)