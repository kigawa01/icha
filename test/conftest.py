import asyncio
from datetime import timedelta, timezone, datetime

import pytest
from jose import jwt
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

import app as main
from icha import data, env
from icha.data import TokenData
from icha.repo import user_repo
from icha.table import get_session, BaseTable
from test.base import Client


@pytest.fixture
def app():
    return main.app


@pytest.fixture
def client(app):
    return Client(app)


@pytest.fixture(scope="function")
def session_maker(app):
    db_url = "sqlite+aiosqlite:///:memory:"
    engine = create_async_engine(db_url, echo=False)

    async def init_tables():
        async with engine.begin() as conn:
            await conn.run_sync(BaseTable.metadata.drop_all)
            await conn.run_sync(BaseTable.metadata.create_all)

    asyncio.run(init_tables())

    session_maker = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

    async def override_get_db():
        async with session_maker() as db_session:
            yield db_session

    app.dependency_overrides[get_session] = override_get_db

    yield session_maker


@pytest.fixture
def post_user_body():
    return data.UserBody.from_args(
        name="userName",
        email="user@example.com",
        password="password",
        self_produce=None
    )


@pytest.fixture
def user_table_id(session_maker, post_user_body) -> int:
    async def task():
        async with session_maker() as session:
            user = user_repo.create_user(session, post_user_body)
            await session.commit()
            await session.refresh(user)
            return user.uid

    return asyncio.run(task())


@pytest.fixture
def access_token(session_maker, post_user_body, user_table_id) -> data.TokenData:
    expire = datetime.now(timezone.utc) + timedelta(minutes=1)
    encoded_jwt = jwt.encode(
        data.JwtTokenData.from_args(exp=expire, user_id=user_table_id, token_type="access").model_dump(),
        env.SECRET_KEY,
        algorithm=main.ALGORITHM
    )
    return TokenData.from_args(encoded_jwt, expire)
