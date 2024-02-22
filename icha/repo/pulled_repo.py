from sqlalchemy.ext.asyncio import AsyncSession

from icha import table


async def create(
        session: AsyncSession,
        user: table.UserTable,
        content: table.ContentTable,
        refresh: bool = False
):
    content = table.PulledContentTable.create(user, content)
    session.add(content)
    if refresh:
        await session.refresh(content)
    return content
