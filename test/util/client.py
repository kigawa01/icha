from typing import Optional

from httpx import AsyncClient

from app import app

client = AsyncClient(app=app, base_url="http://127.0.0.1/")


def get_test(path: str, token: Optional[str] = None):
    headers = {}
    if token is not None:
        headers["Authorization"] = f"Bearer {token}"
    result = client.get(path, headers=headers)
    return result


async def post_test(path: str, json_data, token: Optional[str] = None):
    headers = {}
    if token is not None:
        headers["Authorization"] = f"Bearer {token}"
    result = await client.post(path, json=json_data, headers=headers)
    return result


def put_test(path: str, json_data: dict, token: Optional[str] = None):
    headers = {}
    if token is not None:
        headers["Authorization"] = f"Bearer {token}"
    result = client.put(path, json=json_data, headers=headers)
    return result


def delete_test(path: str, token: Optional[str] = None):
    headers = {}
    if token is not None:
        headers["Authorization"] = f"Bearer {token}"
    result = client.delete(path, headers=headers)
    return result
