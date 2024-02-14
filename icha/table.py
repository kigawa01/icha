import os

import dotenv
from sqlalchemy import Column, Integer, String, Text, ForeignKey
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

engine = create_async_engine(db_url, echo=False)
session_maker = async_sessionmaker(
    autocommit=False, autoflush=False, bind=engine, class_=AsyncSession
)

BaseTable = declarative_base()


async def get_session():
    async with session_maker() as session:
        yield session


class UserTable(BaseTable):
    __tablename__ = "user"
    uid: Mapped[int] = Column(Integer, primary_key=True, name="uid", autoincrement=True)
    name: Mapped[str] = Column(String(32), nullable=False)
    email: Mapped[str] = Column(String(32), nullable=False, unique=True)
    password: Mapped[str] = Column(String(128), nullable=False)

    def set_password(self, password: str):
        self.password = passwd.get_hash(password)

    def check_password(self, password: str):
        return passwd.verify_password(password, self.password)

    def to_login_res(self):
        from icha import tokens
        res = data.LoginRes.from_args(
            uid=self.uid,
            name=self.name,
            email=self.email,
            tokens=tokens.create_tokens(self)
        )
        return res

    def to_user_res(self):
        res = data.UserRes.from_args(
            uid=self.uid,
            name=self.name,
            email=self.email,
        )
        return res


class ThumbnailTable(BaseTable):
    __tablename__ = 'thumbnail'
    gacha_id: Mapped[int] = Column(ForeignKey("gacha.uid", ondelete="CASCADE"), primary_key=True)
    name: Mapped[str] = Column(String(64), nullable=False)
    base64: Mapped[str] = Column(Text(16_000_000), nullable=False)

    def to_image_data(self):
        return data.ImageData(
            base64=self.base64,
            name=self.name,
        )


class LicenceTable(BaseTable):
    __tablename__ = 'licence'
    gacha_id: Mapped[int] = Column(ForeignKey("gacha.uid", ondelete="CASCADE"), primary_key=True)
    text: Mapped[str] = Column(String(255), nullable=False)
    business: Mapped[str] = Column(String(128), nullable=False)
    post: Mapped[str] = Column(String(128), nullable=False)
    credit: Mapped[str] = Column(String(128), nullable=False)
    distribution: Mapped[str] = Column(String(128), nullable=False)
    material: Mapped[str] = Column(String(128), nullable=False)

    def to_licence_data(self):
        from icha.repo import gacha_repo
        return data.LicenceData(
            text=self.text,
            business=gacha_repo.str_to_str_bool(self.business),
            post=gacha_repo.str_to_str_bool(self.post),
            credit=gacha_repo.str_to_str_bool(self.credit),
            distribution=gacha_repo.str_to_str_bool(self.distribution),
            material=gacha_repo.str_to_str_bool(self.material),
        )


class GachaContentImageTable(BaseTable):
    __tablename__ = 'content_image'
    content_id: Mapped[int] = Column(ForeignKey("content.uid", ondelete="CASCADE"), primary_key=True)
    name: Mapped[str] = Column(String(64), nullable=False)
    base64: Mapped[str] = Column(Text(16_000_000), nullable=False)

    def to_image_data(self):
        return data.ImageData(
            base64=self.base64,
            name=self.name,
        )


class GachaContentTable(BaseTable):
    __tablename__ = "content"
    uid: Mapped[int] = Column(Integer, primary_key=True, name="uid", autoincrement=True)
    gacha_id: Mapped[int] = Column(ForeignKey("gacha.uid", ondelete="CASCADE"))
    title: Mapped[str] = Column(String(128), nullable=False)
    description: Mapped[str] = Column(String(255), nullable=False)
    rate: Mapped[int] = Column(Integer)

    def to_content_res(self, content_image: GachaContentImageTable):
        return data.GachaContentRes(
            uid=self.uid,
            image=content_image.to_image_data(),
            title=self.title,
            description=self.description,
            rate=self.rate,
        )


class GachaTable(BaseTable):
    __tablename__ = "gacha"
    uid: Mapped[int] = Column(Integer, primary_key=True, name="uid", autoincrement=True)
    user_id: Mapped[int] = Column(ForeignKey("user.uid"))
    name: Mapped[str] = Column(String(64), nullable=False)
    description: Mapped[str] = Column(String(255), nullable=False)

    def to_gacha_res(self, thumbnail: ThumbnailTable, licence: LicenceTable,
                     contents: list[tuple[GachaContentTable, GachaContentImageTable]]):
        content_res = list[data.GachaContentRes]()
        for (content, content_image) in contents:
            content: GachaContentTable
            content_image: GachaContentImageTable
            content_res.append(content.to_content_res(content_image))

        return data.GachaRes(
            uid=self.uid,
            name=self.name,
            description=self.description,
            thumbnail=thumbnail.to_image_data(),
            licence=licence.to_licence_data(),
            contents=content_res,
        )
