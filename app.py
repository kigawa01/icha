import logging
import sys

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from icha.env import cors_list
from icha.util.logger_filter import ExcludeFilter

# 構造化ロギング設定 (JSON形式でkey=valueログを出力)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="icha API",
    description="ガチャコンテンツ管理・共有プラットフォーム",
    version="0.1.0",
)

logging.getLogger("uvicorn.access").addFilter(ExcludeFilter(["/api/health"]))

if cors_list is None:
    cors_list = "*"

# CORSミドルウェアは最後に登録したミドルウェアが最初に実行されるため先に登録
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_list.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from icha.middleware import RequestLoggingMiddleware, SecurityHeadersMiddleware  # noqa: E402
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RequestLoggingMiddleware)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 14

# noinspection PyUnresolvedReferences
import icha.apis
# noinspection PyUnresolvedReferences
import icha.error
