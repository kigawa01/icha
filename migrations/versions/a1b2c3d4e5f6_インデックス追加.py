"""パフォーマンス改善のためのインデックス追加

Revision ID: a1b2c3d4e5f6
Revises: f991e753a946
Create Date: 2026-06-27

"""
from typing import Sequence, Union

from alembic import op

revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = 'f991e753a946'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index("ix_gacha_create_at", "gacha", ["create_at"])
    op.create_index("ix_gacha_user_id", "gacha", ["user_id"])
    op.create_index("ix_content_gacha_id", "content", ["gacha_id"])
    op.create_index("ix_pulled_content_user_id", "pulled_content", ["user_id"])
    op.create_index("ix_pulled_content_content_id", "pulled_content", ["content_id"])


def downgrade() -> None:
    op.drop_index("ix_gacha_create_at", table_name="gacha")
    op.drop_index("ix_gacha_user_id", table_name="gacha")
    op.drop_index("ix_content_gacha_id", table_name="content")
    op.drop_index("ix_pulled_content_user_id", table_name="pulled_content")
    op.drop_index("ix_pulled_content_content_id", table_name="pulled_content")
