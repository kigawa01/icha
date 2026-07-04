import pytest


@pytest.mark.asyncio
async def test_health_ok(client, session_maker):
    result = await client.get("/api/health")
    assert result.status_code == 200
    assert result.json() == {"ok": True}
