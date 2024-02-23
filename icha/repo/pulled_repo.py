from sqlalchemy.ext.asyncio import AsyncSession

from icha import table


async def create(
        session: AsyncSession,
        user: table.UserTable,
        content: table.ContentTable,
        refresh: bool = False
):
    pulled = table.PulledContentTable.create(user, content)
    session.add(pulled)
    if refresh:
        await session.refresh(pulled)
    return pulled
