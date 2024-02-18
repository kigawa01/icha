import sqlalchemy
from sqlalchemy.ext.asyncio import AsyncSession

from icha import table, data
from icha.error import ErrorIdException, ErrorIds


def create(session: AsyncSession, thumbnail_data: data.ImageFileData, gacha: table.GachaTable):
    thumbnail = table.ThumbnailTable()
    thumbnail.gacha_id = gacha.uid
    thumbnail.name = thumbnail_data.name
    thumbnail.base64 = thumbnail_data.base64
    session.add(thumbnail)
    return thumbnail


async def by_gacha(session: AsyncSession, gacha: table.GachaTable) -> table.ThumbnailTable:
    result = await session.execute(
        sqlalchemy.select(table.ThumbnailTable).where(table.ThumbnailTable.gacha_id == gacha.uid)
    )
    result = result.scalar_one_or_none()
    if result is None:
        raise ErrorIdException(ErrorIds.THUMBNAIL_NOT_FOUND, f"thumbnail is not found: gacha {gacha.uid}")
    return result
