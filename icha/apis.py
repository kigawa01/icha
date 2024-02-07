from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app import app
from icha import data, tokens
from icha.data import LoginRes, TokensRes
from icha.error import ErrorIdException, ErrorIds
from icha.repo import user_repo
from icha.table.table import get_session
from icha.tokens import TokenData, get_token, access_token


@app.get("/api/health")
async def health():
    return {"ok": True}


@app.post("/api/login/refresh")
async def refresh_token(
        session: AsyncSession = Depends(get_session),
        token: TokenData = Depends(get_token)
) -> TokensRes:
    user = await user_repo.by_token(session, token)
    return tokens.create_tokens(user)


@app.post("/api/login")
async def login(req: data.LoginBody, session: AsyncSession = Depends(get_session)) -> LoginRes:
    user = await user_repo.by_email(session, req.email)
    if not user.check_password(req.password):
        raise ErrorIdException(ErrorIds.USER_LOGIN_FAILED)
    return user.to_login_res()


@app.post("/api/user")
async def create_user(req: data.PostUserBody, session: AsyncSession = Depends(get_session)) -> LoginRes:
    user = user_repo.create(session, req)
    await session.commit()
    await session.refresh(user)
    return user.to_login_res()


@app.get("/api/user/self")
async def get_self_user(
        session: AsyncSession = Depends(get_session),
        token: TokenData = Depends(access_token)
) -> data.UserRes:
    user = await user_repo.by_token(session, token)
    return user.to_user_res()
