import os

import dotenv
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped

from icha import data
from icha.util import passwd

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
    db_url = f"mysql+asyncmy://{db_user}:{db_pass}@{db_host}/{db_name}"

engine = create_async_engine(db_url, echo=True)
session_maker = async_sessionmaker(
    autocommit=False, autoflush=False, bind=engine, class_=AsyncSession
)

BaseTable = declarative_base()


async def get_session():
    async with session_maker() as session:
        yield session


class UserTable(BaseTable):
    __tablename__ = "user"
    uid: Mapped[int] = Column(Integer, primary_key=True, name="id", autoincrement=True)
    name: Mapped[str] = Column(String(32), nullable=False)
    email: Mapped[str] = Column(String(32), nullable=False, unique=True)
    password: Mapped[str] = Column(String(128), nullable=False)

    @staticmethod
    def create(body: data.PostUserBody):
        table = UserTable()
        table.name = body.name
        table.email = body.email
        table.set_password(body.password)
        return table

    def set_password(self, password: str):
        self.password = passwd.get_hash(password)

    def check_password(self, password: str):
        return passwd.verify_password(password, self.password)

    def to_user_res(self):
        res = data.UserRes(
            uid=self.uid,
            name=self.name,
            email=self.email
        )
        return res
