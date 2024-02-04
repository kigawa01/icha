import asyncio

import pytest
from jose import jwt

from app import SECRET_KEY, ALGORITHM
from icha.data import TokensRes, PostUserBody, LoginBody
from icha.table.table import UserTable
from icha.tokens import TokenData
from test.util.client import post_test


@pytest.fixture
def login_body(post_user_body):
    return LoginBody.from_args(
        email=post_user_body.email,
        password=post_user_body.password
    )


@pytest.fixture
def post_user_body():
    return PostUserBody.from_args(
        name="userName",
        email="user@example.com",
        password="password"
    )


@pytest.fixture
def user_table(session_maker, post_user_body) -> int:
    async def task():
        user = UserTable.create(post_user_body)
        async with session_maker() as session:
            session.add(user)
            await session.commit()
            await session.refresh(user)
            return user.uid

    return asyncio.run(task())


@pytest.mark.asyncio
async def test_login(session_maker, login_body, user_table):
    result = await post_test(
        "/api/login",
        login_body.model_dump()
    )
    assert result.status_code == 200, f"invalid status code {result.json()}"
    body = result.json()
    assert body is not None
    body = TokensRes(**body)

    assert user_table == TokenData(
        **jwt.decode(body.access_token.token, SECRET_KEY, algorithms=[ALGORITHM])
    ).user_id
