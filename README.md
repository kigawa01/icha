# icha

ガチャコンテンツの管理・共有プラットフォーム。

## 使用するもの

| レイヤー | 技術 |
|---|---|
| バックエンド | Python 3.12, FastAPI, SQLAlchemy 2.0 (async), Alembic |
| フロントエンド | Next.js 14, React 18, TypeScript, MUI v5 |
| データベース | MySQL (asyncmy ドライバ) |
| 認証 | JWT (python-jose, HS256) |
| パスワード | bcrypt (passlib) |
| デプロイ | Docker, Harbor, Argo CD |

## セットアップ

### 必要なもの

- Python 3.12
- Node.js 21+
- MySQL 8+
- [Rye](https://rye-up.com/)

### 手順

1. **Rye・パッケージのインストール**

   ```bash
   curl -sSf https://rye-up.com/get | bash
   rye sync
   npm ci
   ```

2. **環境変数の設定**

   ```bash
   cp .env.example .env.local
   # .env.local を環境に合わせて編集する
   ```

3. **APIクライアントの生成**

   ```bash
   docker compose -f generate-openapi.yml up --abort-on-container-exit
   ```

4. **データベースのマイグレーション**

   ```bash
   alembic upgrade head
   ```

5. **サーバーの起動**

   ```bash
   # バックエンド (ポート8000)
   uvicorn app:app --reload

   # フロントエンド (ポート3000)
   npm run dev
   ```

## 環境変数

| 変数名 | 必須 | 説明 |
|---|---|---|
| `SECRET_KEY` | **必須** | JWT署名用秘密鍵。本番環境では十分に長くランダムな値を設定すること |
| `DB_USER` | DB_URLが未設定の場合必須 | MySQLユーザー名 |
| `DB_PASS` | DB_URLが未設定の場合必須 | MySQLパスワード |
| `DB_HOST` | 任意 | MySQLホスト (デフォルト: `localhost`) |
| `DB_PORT` | 任意 | MySQLポート (デフォルト: `3306`) |
| `DB_NAME` | 任意 | データベース名 (デフォルト: `icha`) |
| `DB_URL` | 任意 | 完全なDB接続URL（設定するとDB_USER等は無視される） |
| `CORS_LIST` | 任意 | CORS許可オリジンのカンマ区切りリスト |
| `NEXT_PUBLIC_BASE_URL` | 任意 | フロントエンドからのAPI base URL |
| `NEXT_PUBLIC_DEBUG` | 任意 | デバッグモード (`true`/`false`) |

## APIエンドポイント一覧

| メソッド | パス | 認証 | 説明 |
|---|---|---|---|
| GET | `/api/health` | 不要 | ヘルスチェック（DB接続確認含む） |
| POST | `/api/login` | 不要 | メール・パスワードでログイン |
| POST | `/api/login/refresh` | リフレッシュトークン | アクセストークンの更新 |
| POST | `/api/user` | 不要 | ユーザー登録 |
| GET | `/api/user/self` | アクセストークン | 自分のプロフィール取得 |
| PUT | `/api/user/self` | アクセストークン | 自分のプロフィール更新 |
| GET | `/api/user/{user_id}` | 任意 | ユーザープロフィール取得 |
| POST | `/api/gacha` | アクセストークン | ガチャ作成 |
| GET | `/api/gacha` | 任意 | ガチャ一覧取得（ページネーション・検索対応） |
| GET | `/api/gacha/{uid}` | 任意 | ガチャ詳細取得 |
| POST | `/api/gacha/{uid}/pull` | アクセストークン | ガチャを引く |
| GET | `/api/gacha/{gacha_id}/contents/{content_id}` | アクセストークン | コンテンツ詳細取得 |

## コーディング規約

- Issue・PR・コミットメッセージ・コードコメントは**日本語**で書く
- データベースへのクエリは `icha/repo/` 以下の Repository に書く
- フロントエンドのAPIクライアントは OpenAPI スキーマから自動生成する

## テスト

```bash
pytest
```

テストはインメモリ SQLite を使用するため、MySQL がなくても実行できる。

## Links

- [ホスティングサイト](https://icha.kigawa.net/)
