from test.util.samples import Samples, SampleEntry
from test.sample.user_sample import UserSample


async def setup():
    return await Samples.create([
        SampleEntry(UserSample, None)
    ])
