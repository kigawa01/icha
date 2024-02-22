from typing import Sequence

import sqlalchemy
from sqlalchemy.ext.asyncio import AsyncSession

from icha import data, table
from icha.error import ErrorIdException, ErrorIds
from icha.table import GachaTable


def create_gacha(session: AsyncSession, gacha_body: data.GachaBody, user: table.UserTable):
    gacha = table.GachaTable()
    gacha.user_id = user.uid
    gacha.name = gacha_body.name
    gacha.description = gacha_body.description
    session.add(gacha)
    return gacha


def create_image(session: AsyncSession, image_data: data.ImageFileData, content: table.ContentTable):
    image = table.GachaContentImageTable()
    image.content_id = content.uid
    image.name = image_data.name
    image.base64 = image_data.base64
    session.add(image)
    return image


async def by_id(session: AsyncSession, uid: int) -> table.GachaTable:
    result = await session.execute(
        sqlalchemy.select(table.GachaTable).where(table.GachaTable.uid == uid)
    )
    result = result.scalar_one_or_none()
    if result is None:
        raise ErrorIdException(ErrorIds.GACHA_NOT_FOUND, f"gacha is not found: {uid}")
    return result


async def all_by_id(
        session: AsyncSession,
        order: str = "new",
        size: int = 16,
        page: int = 0,
) -> Sequence[GachaTable]:
    query = sqlalchemy.select(table.GachaTable)
    if order == "new":
        query = query.order_by(sqlalchemy.desc(table.GachaTable.create_at))
    query = query.offset(page * size).limit(size)
    result = await session.execute(query)
    result = result.scalars().all()
    return result
