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
    npm ci
    ```
3. `.env.example` を `.env` としてコピーし、値を環境に合わせて書き換える
   ```shell
   cp .env.example .env
   ```
   | 変数名 | 説明 |
   | --- | --- |
   | `DB_USER` / `DB_PASS` / `DB_HOST` / `DB_PORT` / `DB_NAME` | MySQL 接続情報 (`DB_URL` を直接指定する場合は不要) |
   | `DB_URL` | DB 接続文字列を直接指定する場合に使用（未設定なら上記の値から組み立てられる） |
   | `SECRET_KEY` | JWT 署名鍵。本番環境では十分にランダムな値を設定すること |
   | `CORS_LIST` | 許可するオリジンのカンマ区切りリスト。未設定の場合はすべてのオリジンを拒否する |
   | `NEXT_PUBLIC_BASE_URL` | フロントエンドから参照するバックエンドの URL |
4. migrate database
   ```shell
   alembic revision --autogenerate
   alembic upgrade head
   ```
5. run
   ```shell
   uvicorn app:app --reload --port 8000  # backend
   npm run dev                           # frontend
   ```

## test

```shell
pytest        # backend
npm run build # frontend (型チェック含む)
```

## ヘルスチェック

`GET /api/health` は DB への接続確認まで行い、接続できない場合は `503` を返す。

## コーディング規約

* このリポジトリではIssue・PR・コミットメッセージ・コードコメントを**日本語**で書く（詳細は [CONTRIBUTING.md](.github/CONTRIBUTING.md) を参照）
* データベースへのクエリはrepositoryに書く

## Links

* [hosted site](https://icha.kigawa.net/)
