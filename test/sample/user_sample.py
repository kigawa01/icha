from dataclasses import dataclass

import sqlalchemy
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from icha.data import PostUserBody
from icha.table.table import UserTable
from test.util.samples import Samples, Sample


@dataclass
class UserSample(Sample):
    samples: Samples
    id_primary: int

    @staticmethod
    def table_class() -> type[UserTable]:
        return UserTable

    @staticmethod
    async def create(samples: Samples, session: Session):
        table: UserTable = UserTable.create(UserSample.body_primary())
        session.add(table)
        session.commit()
        return UserSample(samples, table.uid)

    @staticmethod
    def body_primary():
        return PostUserBody(
            name="user_primary",
            password="user_primary_password",
            email="primary@example.com",
        )

    @staticmethod
    def body_new():
        return PostUserBody(
            name="user_new",
            password="user_new_password",
            email="new@example.com",
        )

    async def model_primary(self, session: AsyncSession) -> UserTable:
        result = await session.execute(
            sqlalchemy.select(UserTable, UserTable.uid == self.id_primary)
        )
        return await result.first()
