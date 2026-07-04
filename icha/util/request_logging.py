import logging
import time
import uuid

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response

logger = logging.getLogger("icha.request")

REQUEST_ID_HEADER = "X-Request-ID"
_UNLOGGED_PATHS = {"/api/health"}


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """リクエストごとに一意な ID を付与し、処理時間とステータスを構造化ログとして記録する"""

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        request_id = request.headers.get(REQUEST_ID_HEADER) or uuid.uuid4().hex
        start = time.perf_counter()
        response = await call_next(request)
        duration_ms = (time.perf_counter() - start) * 1000
        response.headers[REQUEST_ID_HEADER] = request_id
        if request.url.path not in _UNLOGGED_PATHS:
            logger.info(
                "%s %s -> %s (%.1fms) request_id=%s",
                request.method,
                request.url.path,
                response.status_code,
                duration_ms,
                request_id,
            )
        return response
