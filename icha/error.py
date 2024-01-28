import traceback
from dataclasses import dataclass
from enum import Enum

from app import app, jwt


class ErrorIds(Enum):
    INTERNAL_ERROR = ErrorId("server internal error", 500)

    PASSWORD_EMPTY = ErrorId("password is empty", 400)
    USER_NOT_FOUND = ErrorId("user not found", 400)

    UNAUTHORIZED = ErrorId("unauthorized", 401)
    NOT_PERMITTED = ErrorId("not permitted", 401)

    NOT_FOUND = ErrorId("404 not found", 404)

    USER_NAME_CONFLICT = ErrorId("user name conflict", 409)
    TOKEN_CONFLICT = ErrorId("token conflict", 409)
    TOKEN_EXPIRED = ErrorId("token expired", 409)
    INVALID_TOKEN = ErrorId("token invalid", 409)
    USER_LOGIN_FAILED = ErrorId("user login failed, invalid name or password", 409)


@dataclass
class ErrorRes:
    error_id: str
    message: str


@app.errorhandler(ErrorIdException)
def response_exception(e: ErrorIdException):
    return asdict(ErrorRes(
        e.error_id.name,
        e.message
    )), e.error_id.value.status_code


@app.errorhandler(404)
def response_exception(e):
    if isinstance(e, ErrorIdException):
        return asdict(ErrorRes(
            ErrorIds.NOT_FOUND.name,
            e.message
        )), ErrorIds.NOT_FOUND.value.status_code
    return {
        "error_id": ErrorIds.NOT_FOUND.name,
        "message": e
    }, 404


@app.errorhandler(Exception)
def exception(e: Exception):
    print(traceback.format_exc())
    app.logger.warning(traceback.format_exc())
    return asdict(ErrorRes(
        ErrorIds.INTERNAL_ERROR.name,
        e.__str__()
    )), ErrorIds.INTERNAL_ERROR.value.status_code


@jwt.expired_token_loader
def jwt_expired(header, data):
    return asdict(ErrorRes(
        ErrorIds.TOKEN_EXPIRED.name,
        ErrorIds.TOKEN_EXPIRED.value.message
    )), ErrorIds.TOKEN_EXPIRED.value.status_code


@jwt.invalid_token_loader
def jwt_invalid_token(reason):
    return asdict(ErrorRes(
        ErrorIds.INVALID_TOKEN.name,
        reason
    )), ErrorIds.INVALID_TOKEN.value.status_code


@jwt.unauthorized_loader
def jwt_unauthorized(reason):
    return asdict(ErrorRes(
        ErrorIds.UNAUTHORIZED.name,
        reason
    )), ErrorIds.UNAUTHORIZED.value.status_code
