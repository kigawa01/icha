import sqlalchemy
from sqlalchemy.ext.asyncio import AsyncSession

from icha import data, table
from icha.error import ErrorIdException, ErrorIds


def create(session: AsyncSession, image_data: data.ImageFileData, content: table.ContentTable):
    image = table.ContentImageTable()
    image.content_id = content.uid
    image.name = image_data.name
    image.base64 = image_data.base64
    session.add(image)
    return image


async def by_content(
        session: AsyncSession, content: table.ContentTable
) -> table.ContentTable:
    res = await session.execute(
        sqlalchemy.select(table.ContentImageTable).where(
            table.ContentImageTable.content_id == content.uid
        )
    )
    res = res.scalar_one_or_none()
    if res is None:
        raise ErrorIdException(ErrorIds.CONTENT_IMAGE_NOT_FOUND)
    return res
