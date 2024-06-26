import pytest
from sqlalchemy import select, func

from icha import data
from icha.data import UserBody
from icha.table import UserTable


@pytest.fixture
def new_post_user_body():
    return UserBody.from_args(
        name="newUserName",
        email="newUser@example.com",
        password="new password",
        self_produce=None
    )


@pytest.mark.asyncio
async def test_create_user(session_maker, new_post_user_body, client):
    result = await client.post(
        "/api/user",
        new_post_user_body.model_dump()
    )
    assert result.status_code == 200, f"invalid status code {result.data}"
    body = result.json()
    assert body is not None
    body = data.LoginRes(**body)
    async with session_maker() as session:
        result = await session.execute(
            select(func.count())
            .select_from(UserTable)
            .where(UserTable.uid == body.uid)
        )
        assert result.scalar_one() == 1, f"\n{body}\n"


@pytest.mark.asyncio
async def test_get_self(client, access_token, session_maker, new_post_user_body):
    result = await client.get(
        "/api/user/self",
        access_token.token
    )
    assert result.status_code == 200, f"invalid status code {result.data}"
    body = result.json()
    assert body is not None
    body = data.UserRes(**body)
    async with session_maker() as session:
        result = await session.execute(
            select(func.count())
            .select_from(UserTable)
            .where(UserTable.uid == body.uid)
        )
        assert result.scalar_one() == 1, f"\n{body}\n"
