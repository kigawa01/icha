import asyncio

import pytest
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app import app
from icha.table.table import get_session, BaseTable


@pytest.fixture(scope="function")
def session_maker():
    db_url = "sqlite+aiosqlite:///:memory:"
    engine = create_async_engine(db_url, echo=True)

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
