# icha

## 使用するもの

* python FastApi
    * SQLAlchemy
* npm
    * Next.js
    * MUI

## setup

1. install python 3.12
    * https://www.python.org/downloads/
2. install depends
    ```shell
    pip install -r requirements.txt
    ```
3. copy .env
4. write .env
5. migrate database
   ```shell
   alembic revision --autogenerate
   alembic upgrade head
   ```
   
## コーディング規約

* データベースへのクエリはrepositoryに書く