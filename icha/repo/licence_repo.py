import sqlalchemy
from sqlalchemy.ext.asyncio import AsyncSession

from icha import table, data
from icha.error import ErrorIdException, ErrorIds


async def by_gacha(session: AsyncSession, gacha: table.GachaTable) -> table.LicenceTable:
    result = await session.execute(
        sqlalchemy.select(table.LicenceTable).where(table.LicenceTable.gacha_id == gacha.uid)
    )
    result = result.scalar_one_or_none()
    if result is None:
        raise ErrorIdException(ErrorIds.LICENCE_NOT_FOUND, f"licence is not found: gacha {gacha.uid}")
    return result


def create(session: AsyncSession, licence_data: data.LicenceData, gacha: table.GachaTable):
    licence = table.LicenceTable()
    licence.gacha_id = gacha.uid
    licence.text = licence_data.text
    licence.business = licence_data.business
    licence.post = licence_data.post
    licence.credit = licence_data.credit
    licence.distribution = licence_data.distribution
    licence.material = licence_data.material
    session.add(licence)
    return licence
