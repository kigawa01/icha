from datetime import datetime, timezone, timedelta

import pytest
from jose import jwt

from app import ALGORITHM
from icha import data
from icha.env import SECRET_KEY


@pytest.fixture
def login_body(post_user_body):
    return data.LoginBody.from_args(
        email=post_user_body.email,
        password=post_user_body.password
    )


@pytest.fixture
def refresh_token(session_maker, post_user_body, user_table_id) -> data.TokenData:
    expire = datetime.now(timezone.utc) + timedelta(minutes=1)
    encoded_jwt = jwt.encode(
        data.JwtTokenData.from_args(exp=expire, user_id=user_table_id, token_type="refresh").model_dump(),
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return data.TokenData.from_args(encoded_jwt, expire)


@pytest.mark.asyncio
async def test_login(client, session_maker, login_body, user_table_id):
    result = await client.post(
        "/api/login",
        login_body.model_dump()
    )
    assert result.status_code == 200, f"invalid status code {result.json()}"
    body = result.json()
    assert body is not None
    body = data.LoginRes(**body)

    assert user_table_id == data.JwtTokenData(
        **jwt.decode(body.tokens.access_token.token, SECRET_KEY, algorithms=[ALGORITHM])
    ).user_id


@pytest.mark.asyncio
async def test_refresh(client, session_maker, login_body, user_table_id, refresh_token):
    result = await client.post(
        "/api/login/refresh",
        {},
        token=refresh_token.token
    )
    assert result.status_code == 200, f"invalid status code {result.json()}"
    body = result.json()
    assert body is not None
    body = data.TokensRes(**body)

    assert user_table_id == data.JwtTokenData(
        **jwt.decode(body.access_token.token, SECRET_KEY, algorithms=[ALGORITHM])
    ).user_id
    assert await client.get("/api/refresh", token=body.refresh_token.token)


@pytest.mark.asyncio
async def test_login_with_unknown_email_and_wrong_password_return_same_error(
        client, session_maker, login_body, user_table_id
):
    # メールアドレス不一致とパスワード不一致で異なるエラーを返すとユーザー列挙につながるため、
    # どちらも同じエラーになることを確認する
    unknown_email_result = await client.post(
        "/api/login",
        data.LoginBody.from_args(email="unknown@example.com", password=login_body.password).model_dump()
    )
    wrong_password_result = await client.post(
        "/api/login",
        data.LoginBody.from_args(email=login_body.email, password="wrong-password").model_dump()
    )
    assert unknown_email_result.status_code == wrong_password_result.status_code == 409
    assert unknown_email_result.json()["error_id"] == wrong_password_result.json()["error_id"] == "USER_LOGIN_FAILED"


@pytest.mark.asyncio
async def test_refresh_with_invalid_token_returns_401(client, session_maker):
    result = await client.post("/api/login/refresh", {}, token="invalid-token")
    assert result.status_code == 409
    assert result.json()["error_id"] == "INVALID_TOKEN"
