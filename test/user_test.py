import pytest
from sqlalchemy import select, func

from icha.data import UserRes, PostUserBody
from icha.table.table import UserTable
from test.util.client import post_test


@pytest.fixture
def new_post_user_body():
    return PostUserBody.from_args(
        name="newUserName",
        email="newUser@example.com",
        password="new password"
    )


@pytest.mark.asyncio
async def test_create_user(session_maker, new_post_user_body):
    result = await post_test(
        "/api/user",
        new_post_user_body.model_dump()
    )
    assert result.status_code == 200, f"invalid status code {result.data}"
    body = result.json()
    assert body is not None
    body = UserRes(**body)
    async with session_maker() as session:
        result = await session.execute(select(
            func.count(UserTable.uid),
            UserTable.uid == body.uid
        ))
        assert result.scalar_one() == 1, f"\n{body}\n"
