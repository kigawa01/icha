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


async def by_id(session: AsyncSession, uid: int) -> table.GachaTable:
    result = await session.execute(
        sqlalchemy.select(table.GachaTable).where(table.GachaTable.uid == uid)
    )
    result = result.scalar_one_or_none()
    if result is None:
        raise ErrorIdException(ErrorIds.GACHA_NOT_FOUND, f"gacha is not found: {uid}")
    return result


async def all(
        session: AsyncSession,
        order: str,
        size: int,
        page: int,
        search: str,
        pulled: bool,
        user: table.UserTable | None
) -> Sequence[GachaTable]:
    query = sqlalchemy.select(table.GachaTable)
    where: list[sqlalchemy.ColumnElement] = []
    orders: list[sqlalchemy.ColumnElement] = []
    joins: list[tuple[type[sqlalchemy.Column], *sqlalchemy.ColumnElement]] = []
    if order == "new":
        orders.append(sqlalchemy.desc(table.GachaTable.create_at))
    if search != "" or pulled:
        joins.append((table.ContentTable, table.ContentTable.gacha_id == table.GachaTable.uid))
    if search != "":
        where.append(sqlalchemy.or_(
            table.GachaTable.name.like(f"%{search}%"),
            table.GachaTable.description.like(f"%{search}%"),
            table.ContentTable.title.like(f"%{search}%"),
            table.ContentTable.description.like(f"%{search}%")
        ))
        orders.append(table.GachaTable.name.like(f"%{search}%"))
        orders.append(table.GachaTable.description.like(f"%{search}%"))
        orders.append(table.ContentTable.title.like(f"%{search}%"))
        orders.append(table.ContentTable.description.like(f"%{search}%"))
    if pulled and user is not None:
        joins.append((table.PulledContentTable, table.PulledContentTable.content_id == table.ContentTable.uid))
        where.append(table.PulledContentTable.user_id == user.uid)

    for join in joins:
        query = query.join(*join)
    if len(where) != 0:
        query = query.where(*where)
    if len(orders) != 0:
        query = query.order_by(*orders)
    query = query.offset(page * size).limit(size)
    result = await session.execute(query)
    result = result.scalars().all()
    return result
