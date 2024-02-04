from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app import app
from icha import data, tokens
from icha.data import UserRes, TokensRes
from icha.error import ErrorIdException, ErrorIds
from icha.repo import user_repo
from icha.table.table import get_session


@app.get("/api/health")
async def health():
    return {"ok": True}


@app.get("/api/login/refresh")
async def refresh_token():
    # access_user = UserRepository.current_user_or_none()
    # if access_user is None:
    #     raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    # tokens = TokenManager.create_tokens(access_user)
    # return GetRefreshRes.by_tokens(tokens)
    return {}


@app.post("/api/login")
async def login(req: data.LoginBody, session: AsyncSession = Depends(get_session)):
    user = await user_repo.by_email(session, req.email)
    if not user.check_password(req.password):
        raise ErrorIdException(ErrorIds.USER_LOGIN_FAILED)
    return TokensRes.from_args(
        access_token=tokens.create_access_token(user.uid),
        refresh_token=tokens.create_refresh_token(user.uid)
    )


@app.post("/api/user")
async def create_user(req: data.PostUserBody, session: AsyncSession = Depends(get_session)) -> UserRes:
    user = user_repo.create(session, req)
    await session.commit()
    await session.refresh(user)
    return user.to_user_res()
