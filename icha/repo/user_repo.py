from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from icha import data
from icha.error import ErrorIdException, ErrorIds
from icha.table.table import UserTable
from icha.tokens import TokenData


async def by_uid(session: AsyncSession, uid: int) -> UserTable:
    result = await session.execute(
        select(UserTable)
        .where(UserTable.uid == uid)
    )
    result = result.scalar_one_or_none()
    if result is None:
        raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    return result


async def by_token(session: AsyncSession, token: TokenData) -> UserTable:
    return await by_uid(session, token.user_id)


async def by_email(session: AsyncSession, email: str) -> UserTable:
    result = await session.execute(
        select(UserTable)
        .where(UserTable.email == email)
    )
    result = result.scalar_one_or_none()
    if result is None:
        raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    return result


def create(session: AsyncSession, post_user: data.PostUserBody) -> UserTable:
    user = UserTable.create(post_user)
    session.add(user)
    return user
