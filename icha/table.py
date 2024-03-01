import os
from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped

from icha import data
from icha.util import passwd

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

engine = create_async_engine(db_url, echo=False, pool_pre_ping=True)
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
    self_produce: Mapped[str] = Column(String(255))

    @staticmethod
    def create(
            name: str, email: str, password: str, self_produce: str | None
    ):
        user = UserTable()
        user.apply(name=name, email=email, password=password, self_produce=self_produce)
        return user

    # noinspection PyTypeChecker
    def apply(
            self, name: str, email: str, password: str | None, self_produce: str | None

    ):
        self.name = name
        self.email = email
        if password is not None:
            self.set_password(password)
        self.self_produce = self_produce

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
            self_produce=self.self_produce
        )
        return res


class ThumbnailTable(BaseTable):
    __tablename__ = 'thumbnail'
    gacha_id: Mapped[int] = Column(ForeignKey("gacha.uid", ondelete="CASCADE"), primary_key=True)
    name: Mapped[str] = Column(String(64), nullable=False)
    base64: Mapped[str] = Column(Text(32_000_000), nullable=False)

    def to_image_data(self):
        return data.ImageFileData(
            base64=self.base64,
            name=self.name,
        )


class LicenceTable(BaseTable):
    __tablename__ = 'licence'
    gacha_id: Mapped[int] = Column(ForeignKey("gacha.uid", ondelete="CASCADE"), primary_key=True)
    text: Mapped[str] = Column(Text(4096), nullable=False)
    business: Mapped[str] = Column(String(128), nullable=False)
    post: Mapped[str] = Column(String(128), nullable=False)
    credit: Mapped[str] = Column(String(128), nullable=False)
    distribution: Mapped[str] = Column(String(128), nullable=False)
    material: Mapped[str] = Column(String(128), nullable=False)

    def to_licence_data(self):
        return data.LicenceData(
            text=self.text,
            business=self.business,
            post=self.post,
            credit=self.credit,
            distribution=self.distribution,
            material=self.material,
        )


class ContentImageTable(BaseTable):
    __tablename__ = 'content_image'
    content_id: Mapped[int] = Column(ForeignKey("content.uid", ondelete="CASCADE"), primary_key=True)
    name: Mapped[str] = Column(String(64), nullable=False)
    base64: Mapped[str] = Column(Text(32_000_000), nullable=False)

    def to_image_data(self):
        return data.ImageFileData(
            base64=self.base64,
            name=self.name,
        )


class ContentTable(BaseTable):
    __tablename__ = "content"
    uid: Mapped[int] = Column(Integer, primary_key=True, name="uid", autoincrement=True)
    gacha_id: Mapped[int] = Column(ForeignKey("gacha.uid", ondelete="CASCADE"))
    title: Mapped[str] = Column(String(128), nullable=False)
    description: Mapped[str] = Column(String(255), nullable=False)
    rate: Mapped[int] = Column(Integer)

    def to_content_res(self, content_image: data.ImageFileData, pulled: bool, post_user_id: int):
        return data.GachaContentRes.create(
            uid=self.uid,
            image=content_image,
            title=self.title,
            description=self.description,
            rate=self.rate,
            post_user_id=post_user_id,
            pulled=pulled
        )


class GachaTable(BaseTable):
    __tablename__ = "gacha"
    uid: Mapped[int] = Column(Integer, primary_key=True, name="uid", autoincrement=True)
    user_id: Mapped[int] = Column(ForeignKey("user.uid"))
    name: Mapped[str] = Column(String(64), nullable=False)
    description: Mapped[str] = Column(String(255), nullable=False)
    create_at: Mapped[datetime] = Column(DateTime, default=datetime.now)

    @staticmethod
    def create(user_id: int, name: str, description: str):
        return GachaTable(
            user_id=user_id,
            name=name,
            description=description
        )

    def to_gacha_res(
            self,
            thumbnail: data.ImageFileData,
            licence: data.LicenceData,
            contents: list[data.GachaContentRes]
    ):
        return data.GachaRes(
            uid=self.uid,
            name=self.name,
            description=self.description,
            thumbnail=thumbnail,
            licence=licence,
            contents=contents,
        )

    def to_gacha_list_res(
            self,
            thumbnail: data.ImageFileData,
            licence: data.LicenceData,
    ):
        return data.GachaListRes.create(
            uid=self.uid,
            name=self.name,
            description=self.description,
            thumbnail=thumbnail,
            licence=licence
        )


class PulledContentTable(BaseTable):
    __tablename__ = "pulled_content"
    uid: Mapped[int] = Column(Integer, primary_key=True, name="uid", autoincrement=True)
    user_id: Mapped[int] = Column(ForeignKey("user.uid"))
    content_id: Mapped[int] = Column(ForeignKey("content.uid"))

    @staticmethod
    def create(
            user: UserTable,
            content: ContentTable
    ):
        return PulledContentTable(
            user_id=user.uid,
            content_id=content.uid
        )

    def to_pull_gacha_res(self):
        return data.PullGachaRes.create(
            content_id=self.content_id
        )
