"""emailカラム長修正とインデックス追加

Revision ID: b2c3d4e5f6a7
Revises: a53c4703214a
Create Date: 2026-06-20 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'b2c3d4e5f6a7'
down_revision: Union[str, None] = 'a53c4703214a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # RFC 5321に準拠したメールアドレス最大長に修正
    op.alter_column(
        'user', 'email',
        existing_type=sa.String(length=32),
        type_=sa.String(length=254),
        existing_nullable=False,
    )

    # クエリパフォーマンス向上のためインデックスを追加
    op.create_index('ix_gacha_user_id', 'gacha', ['user_id'])
    op.create_index('ix_gacha_create_at', 'gacha', ['create_at'])
    op.create_index('ix_pulled_content_user_id', 'pulled_content', ['user_id'])
    op.create_index('ix_pulled_content_content_id', 'pulled_content', ['content_id'])


def downgrade() -> None:
    op.drop_index('ix_pulled_content_content_id', 'pulled_content')
    op.drop_index('ix_pulled_content_user_id', 'pulled_content')
    op.drop_index('ix_gacha_create_at', 'gacha')
    op.drop_index('ix_gacha_user_id', 'gacha')

    op.alter_column(
        'user', 'email',
        existing_type=sa.String(length=254),
        type_=sa.String(length=32),
        existing_nullable=False,
    )
