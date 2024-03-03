import os

import dotenv

dotenv.load_dotenv("./.env.local")
dotenv.load_dotenv()
cors_list = os.getenv("CORS_LIST")
SECRET_KEY = os.getenv("SECRET_KEY")
db_url = os.getenv("DB_URL")
db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASS")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")

db_name = os.getenv("DB_NAME")