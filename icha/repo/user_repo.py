from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from icha import data
from icha.error import ErrorIdException, ErrorIds
from icha.table import UserTable


async def by_uid(session: AsyncSession, uid: int) -> UserTable:
    result = await session.execute(
        select(UserTable)
        .where(UserTable.uid == uid)
    )
    result = result.scalar_one_or_none()
    if result is None:
        raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    return result


async def by_token(session: AsyncSession, token: data.JwtTokenData) -> UserTable:
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


def create_user(session: AsyncSession, post_user: data.UserBody) -> UserTable:
    user = UserTable.create(
        name=post_user.name,
        email=post_user.email,
        password=post_user.password,
        self_produce=post_user.self_produce
    )
    session.add(user)
    return user
