from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app import app
from icha import data
from icha.repo import user_repo
from icha.table.table import get_session


@app.get("/api/login/refresh")
async def refresh_token():
    # access_user = UserRepository.current_user_or_none()
    # if access_user is None:
    #     raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    # tokens = TokenManager.create_tokens(access_user)
    # return GetRefreshRes.by_tokens(tokens)
    return {}


@app.get("/api/login")
async def login(req: data.LoginReq):
    return {}


@app.post("/api/user")
async def post_user(req: data.PostUserBody, session: AsyncSession = Depends(get_session)):
    user = user_repo.create(session, req)
    await session.commit()
    await session.refresh(user)
    return user.to_user_res()
