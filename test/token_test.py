from datetime import datetime, timezone, timedelta

import pytest
from jose import jwt

from app import SECRET_KEY, ALGORITHM
from icha.data import TokensRes, LoginBody, Token
from icha.tokens import TokenData


@pytest.fixture
def login_body(post_user_body):
    return LoginBody.from_args(
        email=post_user_body.email,
        password=post_user_body.password
    )


@pytest.fixture
def refresh_token(session_maker, post_user_body, user_table) -> Token:
    expire = datetime.now(timezone.utc) + timedelta(minutes=1)
    encoded_jwt = jwt.encode(
        TokenData.from_args(exp=expire, user_id=user_table, token_type="refresh").model_dump(),
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return Token.from_args(encoded_jwt, expire)


@pytest.mark.asyncio
async def test_login(client, session_maker, login_body, user_table):
    result = await client.post(
        "/api/login",
        login_body.model_dump()
    )
    assert result.status_code == 200, f"invalid status code {result.json()}"
    body = result.json()
    assert body is not None
    body = TokensRes(**body)

    assert user_table == TokenData(
        **jwt.decode(body.access_token.token, SECRET_KEY, algorithms=[ALGORITHM])
    ).user_id


@pytest.mark.asyncio
async def test_refresh(client, session_maker, login_body, user_table, refresh_token):
    result = await client.post(
        "/api/login/refresh",
        {},
        token=refresh_token.token
    )
    assert result.status_code == 200, f"invalid status code {result.json()}"
    body = result.json()
    assert body is not None
    body = TokensRes(**body)

    assert user_table == TokenData(
        **jwt.decode(body.access_token.token, SECRET_KEY, algorithms=[ALGORITHM])
    ).user_id
