from test.sample.user_sample import UserSample
from test.util.samples import Samples, SampleEntry


async def setup():
    return await Samples.create([
        SampleEntry(UserSample, None)
    ])
