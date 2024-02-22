"""empty message

Revision ID: 37a9abd40c9b
Revises: e8944838960e
Create Date: 2024-02-22 17:28:14.760349

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '37a9abd40c9b'
down_revision: Union[str, None] = 'e8944838960e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pulled_content',
    sa.Column('uid', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('content_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['content_id'], ['content.uid'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('uid')
    )
    op.alter_column('content_image', 'base64',
               existing_type=mysql.LONGTEXT(),
               type_=sa.Text(length=16000000),
               existing_nullable=False)
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
    op.alter_column('content_image', 'base64',
               existing_type=sa.Text(length=16000000),
               type_=mysql.LONGTEXT(),
               existing_nullable=False)
    op.drop_table('pulled_content')
    # ### end Alembic commands ###
