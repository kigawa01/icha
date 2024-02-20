"""empty message

Revision ID: e8944838960e
Revises: f991e753a946
Create Date: 2024-02-20 15:09:18.540213

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'e8944838960e'
down_revision: Union[str, None] = 'f991e753a946'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('content_image', 'base64',
               existing_type=mysql.LONGTEXT(),
               type_=sa.Text(length=16000000),
               existing_nullable=False)
    op.add_column('gacha', sa.Column('create_at', sa.DateTime(), nullable=True))
    op.alter_column('thumbnail', 'base64',
               existing_type=mysql.LONGTEXT(),
               type_=sa.Text(length=16000000),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('thumbnail', 'base64',
               existing_type=sa.Text(length=16000000),
               type_=mysql.LONGTEXT(),
               existing_nullable=False)
    op.drop_column('gacha', 'create_at')
    op.alter_column('content_image', 'base64',
               existing_type=sa.Text(length=16000000),
               type_=mysql.LONGTEXT(),
               existing_nullable=False)
    # ### end Alembic commands ###
