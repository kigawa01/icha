from dataclasses import asdict

import pytest
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from icha.data import UserRes
from icha.table.table import session_maker, UserTable
from test import setup, UserSample
from test.util.client import post_test


@pytest.mark.asyncio
async def test_create_user():
    sample = await setup()
    result = await post_test(
        "/api/user",
        sample.get_sample(UserSample).body_new().dict()
    )
    assert result.status_code == 200, f"invalid status code {result.data}"
    body = result.json()
    assert body is not None
    body = UserRes(**body)

    async with session_maker() as session:
        session: AsyncSession
        result = await session.execute(select(
            func.count(UserTable.uid),
            UserTable.uid == body.uid
        ))
        assert result.scalar_one() == 1, f"\n{body}\n"
