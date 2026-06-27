import logging
import os

import dotenv

dotenv.load_dotenv("./.env.local")
dotenv.load_dotenv()

logger = logging.getLogger(__name__)

cors_list = os.getenv("CORS_LIST")
SECRET_KEY = os.getenv("SECRET_KEY")
db_url = os.getenv("DB_URL")
db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASS")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY 環境変数が設定されていません。本番環境では必ず設定してください。")

# 開発用のデフォルト値が本番で使われた場合に警告
_INSECURE_KEYS = {"secret", "password", "changeme", "dev", "development"}
if SECRET_KEY.lower() in _INSECURE_KEYS or len(SECRET_KEY) < 32:
    logger.warning(
        "SECRET_KEY が短すぎるか安全でない値です。本番環境では十分にランダムな値（32文字以上）を使用してください。"
    )