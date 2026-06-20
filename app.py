import logging
import uuid

from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware

from icha.env import cors_list
from icha.util.logger_filter import ExcludeFilter

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI()

logging.getLogger("uvicorn.access").addFilter(ExcludeFilter(["/health"]))


@app.middleware("http")
async def request_id_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response

if cors_list is None:
    cors_list = "*"
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_list.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 14

# noinspection PyUnresolvedReferences
import icha.apis
# noinspection PyUnresolvedReferences
import icha.error

# from icha.cmd import job

# app.cli.add_command(job)
