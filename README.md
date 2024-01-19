# icha

## 使用するもの

* python flask
    * SQLAlchemy
* npm
    * scss emotion
    * ts react

## setup

1

1. add document
   ```shell
   git submodule update --init --recursive
   ```
2. install python 3.11
    * https://www.python.org/downloads/
3. install depends
    ```shell
    pip install -r requirements.txt
    ```
4. copy .env
5. write .env
6. migrate database
   ```shell
   flask db init
   flask db migrate
   flask db upgrade
   flask job init-database
   ```
   
## コーディング規約

* データベースへのクエリはrepositoryに書く
* apiにルート(path)を書く
* managerに具体的な処理を書く
* managerではmodelを使用しない
* 権限チェックはできるだけrepositoryで書き、どうしても無理な場合managerでかく