@dataclass
class ErrorId:
    message: str
    status_code: int


class ErrorIdException(Exception):
    def __init__(self, error_id: ErrorIds, message: Optional[str] = None):
        if message is None:
            message = error_id.value.message
        self.error_id: ErrorIds = error_id
        self.message = message
