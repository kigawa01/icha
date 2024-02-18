from typing import Sequence

import sqlalchemy
from sqlalchemy import Row
from sqlalchemy.ext.asyncio import AsyncSession

from icha import data, table
from icha.table import GachaContentTable, GachaContentImageTable


def create(session: AsyncSession, content_data: data.GachaContentBody, gacha: table.GachaTable):
    content = table.GachaContentTable()
    content.gacha_id = gacha.uid
    content.title = content_data.title
    content.description = content_data.description
    content.rate = content_data.rate
    session.add(content)
    return content


async def all_with_image_by_gacha(
        session: AsyncSession, gacha: table.GachaTable
) -> Sequence[Row[tuple[GachaContentTable, GachaContentImageTable]]]:
    result = await session.execute(
        sqlalchemy.select(table.GachaContentTable, table.GachaContentImageTable)
        .join(table.GachaContentImageTable, table.GachaContentImageTable.content_id == table.GachaContentTable.uid)
        .where(table.GachaContentTable.gacha_id == gacha.uid)
    )
    result = result.all()
    return result
