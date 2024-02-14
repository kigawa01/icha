import pytest
import sqlalchemy
from sqlalchemy import func

from icha import data, table


@pytest.fixture
def new_post_gacha_body():
    return data.GachaBody.create(
        thumbnail=data.ImageData.create("test", "test"),
        contents=[],
        name="new_post_gacha_body",
        description="new_post_gacha_body_desc",
        licence=data.LicenceData.create(
            text="new_post_gacha_body_licence_text",
            business=True,
            post=True,
            credit=True,
            distribution=True,
            material=True,
        ),
    )


@pytest.mark.asyncio
async def test_create_gacha(session_maker, new_post_gacha_body, client,access_token):
    result = await client.post(
        "/api/gacha",
        new_post_gacha_body.model_dump(),
        access_token.token
    )
    assert result.status_code == 200, f"invalid status code {result.json()}"
    body = result.json()
    assert body is not None
    body = data.GachaRes(**body)
    async with session_maker() as session:
        result = await session.execute(
            sqlalchemy.select(func.count())
            .select_from(table.GachaTable)
            .where(table.GachaTable.uid == body.uid)
        )
        assert result.scalar_one() == 1, f"\n{body}\n"
