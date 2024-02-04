from abc import ABC, abstractmethod
from dataclasses import dataclass

import pytest
import sqlalchemy
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from app import app
from icha.table.table import session_maker, BaseTable, db_url, get_session



@dataclass
class Samples:
    samples: list['SampleEntry']

    @staticmethod
    async def create(sample_list: list['SampleEntry']):
        samples = Samples(sample_list)
        await samples.init_samples()
        return samples

    async def init_samples(self):
        reversed_sample: list[SampleEntry] = [*self.samples]
        reversed_sample.reverse()
        async with session_maker() as session:
            session: AsyncSession
            for sample in reversed_sample:
                table_type = sample.sample_type.table_class()
                await session.execute(sqlalchemy.delete(table_type))
            await session.commit()

            for sample in self.samples:
                sample.instance = await sample.sample_type.create(self, session)

    def get_sample[T: Sample](self, sample_type: type[T]) -> T:
        for sample in self.samples:
            if sample.sample_type == sample_type:
                return sample.instance
        raise ValueError


class Sample(
    ABC
):

    @staticmethod
    @abstractmethod
    async def create[S: Sample](samples: Samples, session: AsyncSession) -> S:
        raise NotImplementedError

    @staticmethod
    @abstractmethod
    def table_class[T: BaseTable]() -> type[T]:
        raise NotImplementedError


@dataclass
class SampleEntry[T: Sample]:
    sample_type: type[T]
    instance: T | None
