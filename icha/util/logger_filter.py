import logging


class ExcludeFilter(logging.Filter):

    def __init__(self, excluded: list[str]) -> None:
        super().__init__()
        self.excluded = excluded

    def filter(self, record: logging.LogRecord) -> bool:
        return record.args and len(record.args) >= 3 and record.args[2] not in self.excluded
