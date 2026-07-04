import logging

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from icha.env import cors_list
from icha.util.logger_filter import ExcludeFilter
from icha.util.request_logging import RequestLoggingMiddleware

logging.basicConfig(
    level="INFO",
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)

logger = logging.getLogger(__name__)

app = FastAPI()

logging.getLogger("uvicorn.access").addFilter(ExcludeFilter(["/health"]))

# CORS_LIST が未設定の場合、認証情報つきリクエストを許可したまま "*" にすると
# 事実上どのオリジンからのクレデンシャル送信も意図せず許容してしまうため、
# 未設定時は安全側(すべて拒否)にフォールバックし、警告ログを出す。
if cors_list is None:
    logger.warning("CORS_LIST is not set; falling back to denying all cross-origin requests")
    cors_list = ""
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin for origin in cors_list.split(",") if origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RequestLoggingMiddleware)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 14

# noinspection PyUnresolvedReferences
import icha.apis
# noinspection PyUnresolvedReferences
import icha.error

# from icha.cmd import job

# app.cli.add_command(job)
