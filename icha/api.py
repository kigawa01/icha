from dataclasses import asdict

from app import app
from icha import request


@app.get("/api/login/refresh")
def refresh_token():
    # access_user = UserRepository.current_user_or_none()
    # if access_user is None:
    #     raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    # tokens = TokenManager.create_tokens(access_user)
    # return GetRefreshRes.by_tokens(tokens)
    return {}


@app.get("/api/login")
def login(req: request.LoginReq):
    return asdict()
