from app import app
from icha.error import ErrorIds
from icha.repository.user_repository import UserRepository
from icha.util.error import ErrorIdException


@app.get("/api/login/refresh")
def refresh_token():
    access_user = UserRepository.current_user_or_none()
    if access_user is None:
        raise ErrorIdException(ErrorIds.USER_NOT_FOUND)
    tokens = TokenManager.create_tokens(access_user)
    return GetRefreshRes.by_tokens(tokens)
