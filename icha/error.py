import traceback
from dataclasses import dataclass, asdict
from enum import Enum

from starlette.responses import JSONResponse

from app import app


@dataclass
class ErrorId:
    message: str
    status_code: int


class ErrorIds(Enum):
    INTERNAL_ERROR = ErrorId("server internal error", 500)

    PASSWORD_EMPTY = ErrorId("password is empty", 400)
    USER_NOT_FOUND = ErrorId("user not found", 400)

    UNAUTHORIZED = ErrorId("unauthorized", 401)
    NOT_PERMITTED = ErrorId("not permitted", 401)

    NOT_FOUND = ErrorId("404 not found", 404)
    GACHA_NOT_FOUND = ErrorId("gacha not found", 404)
    GACHA_CONTENT_NOT_FOUND = ErrorId("gacha content not found", 404)
    CONTENT_IMAGE_NOT_FOUND = ErrorId("content image not found", 404)
    THUMBNAIL_NOT_FOUND = ErrorId("thumbnail not found", 404)

    USER_NAME_CONFLICT = ErrorId("user name conflict", 409)
    TOKEN_CONFLICT = ErrorId("token conflict", 409)
    TOKEN_EXPIRED = ErrorId("token expired", 409)
    INVALID_TOKEN = ErrorId("token invalid", 409)
    USER_LOGIN_FAILED = ErrorId("user login failed, invalid name or password", 409)
    ALL_GACHA_PULLED = ErrorId("all gacha were pulled", 409)


class ErrorIdException(Exception):
    def __init__(self, error_id: ErrorIds, message: str | None = None):
        if message is None:
            message = error_id.value.message
        self.error_id: ErrorIds = error_id
        self.message = message


@dataclass
class ErrorRes:
    error_id: str
    message: str


@app.exception_handler(ErrorIdException)
async def exception_handler(request, exc: ErrorIdException):
    return JSONResponse(
        content=asdict(ErrorRes(
            exc.error_id.name,
            exc.message
        )),
        status_code=exc.error_id.value.status_code
    )


@app.exception_handler(Exception)
async def exception_handler(request, exc: Exception):
    print(traceback.format_exc())
    return JSONResponse(
        content=asdict(ErrorRes(
            ErrorIds.INTERNAL_ERROR.name,
            exc.__str__()
        )),
        status_code=ErrorIds.INTERNAL_ERROR.value.status_code
    )


@app.exception_handler(401)
async def exception_handler(request, exc: Exception):
    return JSONResponse(
        content=asdict(ErrorRes(
            ErrorIds.UNAUTHORIZED.name,
            exc.__str__()
        )),
        status_code=ErrorIds.UNAUTHORIZED.value.status_code
    )
