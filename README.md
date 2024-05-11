# icha

## 使用するもの

* python FastApi
    * SQLAlchemy
* npm
    * Next.js
    * MUI

## setup

1. install package
    * ```bash
      sudo apt install -y python3.12 python3-clang clang
      curl -sSf https://rye-up.com/get | bash
      ```
2. install depends
    ```shell
    rye sync
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