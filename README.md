# icha

ガチャ（くじ引き）コンテンツを作成・共有できるWebアプリケーション。

- **ホスト**: https://icha.kigawa.net/

## 技術スタック

| レイヤー | 技術 |
|---|---|
| バックエンド | Python 3.12 / FastAPI / SQLAlchemy 2.0 (非同期) |
| フロントエンド | Node.js 21 / Next.js 14 / MUI 5 |
| DB | MySQL (本番) / SQLite (テスト) |
| 認証 | JWT (HS256) — アクセストークン15分、リフレッシュトークン14日 |
| インフラ | Docker / Kubernetes (ArgoCD) / GitHub Actions |

## セットアップ

### 必要条件

- Python 3.12+
- Node.js 21+
- Docker & Docker Compose
- [Rye](https://rye-up.com/) (Python パッケージ管理)

### 1. リポジトリのクローン

```bash
git clone <repo-url>
cd icha
```

### 2. 環境変数の設定

```bash
cp .env.example .env   # .env.example がなければ以下を参考に .env を作成
```

`.env` の設定項目:

| 変数名 | 説明 | 例 |
|---|---|---|
| `SECRET_KEY` | JWT署名用シークレットキー (必須) | `$(openssl rand -hex 32)` |
| `DB_USER` | DBユーザー名 | `root` |
| `DB_PASS` | DBパスワード | `password` |
| `DB_HOST` | DBホスト | `localhost` |
| `DB_PORT` | DBポート | `3306` |
| `DB_NAME` | DB名 | `icha` |
| `DB_URL` | DB接続URL (DB_USER等の代わりに指定可) | `mysql+asyncmy://user:pass@host/db` |
| `CORS_LIST` | 許可するCORSオリジン (カンマ区切り) | `https://icha.kigawa.net` |

### 3. バックエンドのセットアップ

```bash
# 依存関係のインストール
rye sync

# DBマイグレーション
alembic upgrade head

# 開発サーバー起動
rye run uvicorn app:app --reload
```

### 4. フロントエンドのセットアップ

```bash
# APIクライアントの生成 (バックエンド起動後に実施)
docker compose -f generate-openapi.yml -p icha up --abort-on-container-exit

# 依存関係のインストール
npm ci

# 開発サーバー起動
npm run dev
```

## テスト

```bash
# バックエンドテスト (SQLite in-memoryを使用)
rye run pytest

# フロントエンドビルド確認
npm run build
```

## DBマイグレーション

```bash
# モデル変更後にマイグレーションファイルを自動生成
alembic revision --autogenerate -m "変更内容の説明"

# マイグレーション適用
alembic upgrade head

# ロールバック
alembic downgrade -1
```

## API エンドポイント

| メソッド | パス | 認証 | 説明 |
|---|---|---|---|
| GET | `/api/health` | 不要 | ヘルスチェック (DB接続確認含む) |
| POST | `/api/user` | 不要 | ユーザー登録 |
| POST | `/api/login` | 不要 | ログイン |
| POST | `/api/login/refresh` | リフレッシュトークン | アクセストークン更新 |
| GET | `/api/user/self` | アクセストークン | 自分のプロフィール取得 |
| PUT | `/api/user/self` | アクセストークン | プロフィール更新 |
| GET | `/api/user/{user_id}` | 任意 | ユーザープロフィール取得 |
| POST | `/api/gacha` | アクセストークン | ガチャ作成 |
| GET | `/api/gacha` | 任意 | ガチャ一覧取得 |
| GET | `/api/gacha/{uid}` | 任意 | ガチャ詳細取得 |
| POST | `/api/gacha/{uid}/pull` | アクセストークン | ガチャを引く |
| GET | `/api/gacha/{gacha_id}/contents/{content_id}` | アクセストークン | コンテンツ詳細取得 |

### ガチャ一覧クエリパラメータ

| パラメータ | デフォルト | 説明 |
|---|---|---|
| `order` | `new` | 並び順 (`new` = 新着順) |
| `size` | `16` | 1ページあたりの件数 (最大100) |
| `page` | `0` | ページ番号 (0始まり) |
| `search` | `""` | キーワード検索 |
| `pulled` | `false` | 引いたものだけ表示 |

## コーディング規約

- Issue・PR・コミットメッセージ・コードコメントは**日本語**で書く
- データベースへのクエリは `icha/repo/` 配下のリポジトリクラスに書く
- 新しいAPIエンドポイントは `icha/apis.py` に追加する
- 入力バリデーションは `icha/data.py` のPydanticモデルで行う

## アーキテクチャ

```
app.py               # FastAPIアプリ初期化、ミドルウェア設定
icha/
  apis.py            # APIエンドポイント定義
  data.py            # Pydanticリクエスト/レスポンスモデル
  table.py           # SQLAlchemyテーブル定義
  tokens.py          # JWT生成・検証
  error.py           # エラー定義・例外ハンドラー
  env.py             # 環境変数読み込み
  repo/              # DBクエリ (リポジトリパターン)
  util/              # ユーティリティ (パスワードハッシュ等)
migrations/          # Alembicマイグレーション
app/                 # Next.jsフロントエンド
```
