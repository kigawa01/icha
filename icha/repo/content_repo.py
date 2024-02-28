from typing import Sequence

import sqlalchemy
from sqlalchemy import Row
from sqlalchemy.ext.asyncio import AsyncSession

from icha import data, table
from icha.error import ErrorIdException, ErrorIds
from icha.table import ContentTable, ContentImageTable


def create(session: AsyncSession, content_data: data.GachaContentBody, gacha: table.GachaTable):
    content = table.ContentTable()
    content.gacha_id = gacha.uid
    content.title = content_data.title
    content.description = content_data.description
    content.rate = content_data.rate
    session.add(content)
    return content


async def all_with_image_by_gacha(
        session: AsyncSession, gacha: table.GachaTable
) -> Sequence[Row[tuple[ContentTable, ContentImageTable]]]:
    result = await session.execute(
        sqlalchemy.select(table.ContentTable, table.ContentImageTable)
        .join(table.ContentImageTable, table.ContentImageTable.content_id == table.ContentTable.uid)
        .where(table.ContentTable.gacha_id == gacha.uid)
    )
    result = result.all()
    return result


async def all_by_non_pulled(
        session: AsyncSession, gacha_id: int, user: table.UserTable
):
    res = await session.execute(
        sqlalchemy.select(table.ContentTable).where(
            table.ContentTable.gacha_id == gacha_id,
            ~sqlalchemy.exists(table.PulledContentTable).where(
                table.PulledContentTable.content_id == table.ContentTable.uid,
                table.PulledContentTable.user_id == user.uid
            )
        )
    )
    return res.scalars().all()


async def by_gacha_and_uid_and__pulled_or_user(
        session: AsyncSession, gacha_id: int, uid: int, user: table.UserTable
) -> table.ContentTable:
    res = await session.execute(
        sqlalchemy.select(table.ContentTable).join(
            table.GachaTable, table.GachaTable.uid == table.ContentTable.gacha_id
        ).where(
            table.ContentTable.gacha_id == gacha_id,
            table.ContentTable.uid == uid,
            sqlalchemy.or_(
                table.GachaTable.user_id == user.uid,
                sqlalchemy.exists(table.PulledContentTable).where(
                    table.PulledContentTable.content_id == table.ContentTable.uid,
                    table.PulledContentTable.user_id == user.uid
                )
            )
        )
    )
    res = res.scalar_one_or_none()
    if res is None:
        raise ErrorIdException(ErrorIds.GACHA_CONTENT_NOT_FOUND)
    return res


async def is_content_pulled(
        session: AsyncSession,
        content: table.ContentTable,
        user: table.UserTable
) -> bool:
    res = await session.execute(
        sqlalchemy.select(table.PulledContentTable).where(
            table.PulledContentTable.content_id == content.uid,
            table.PulledContentTable.user_id == user.uid
        )
    )
    return res.scalar_one_or_none() is not None


async def is_content_available(
        session: AsyncSession,
        content: table.ContentTable,
        user: table.UserTable,
        gacha: table.GachaTable | None = None,
) -> bool:
    if gacha is None:
        res = await session.execute(
            sqlalchemy.select(table.GachaTable).where(
                table.GachaTable.uid == content.gacha_id,
                table.GachaTable.user_id == user.uid
            )
        )
        if res.scalar_one_or_none() is not None:
            return True
    else:
        if gacha.user_id == user.uid:
            return True
    res = await session.execute(
        sqlalchemy.select(table.PulledContentTable).where(
            table.PulledContentTable.content_id == content.uid,
            table.PulledContentTable.user_id == user.uid
        )
    )
    return res.scalar_one_or_none() is not None
