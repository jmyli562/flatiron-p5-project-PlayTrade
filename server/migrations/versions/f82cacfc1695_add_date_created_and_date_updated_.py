"""add date_created and date_updated column to Review model

Revision ID: f82cacfc1695
Revises: 191b96559363
Create Date: 2023-09-27 16:37:28.769238

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f82cacfc1695'
down_revision = '191b96559363'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_created', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('date_updated', sa.DateTime(), nullable=True))
        batch_op.alter_column('content',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('rating',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('rating',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('content',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_column('date_updated')
        batch_op.drop_column('date_created')

    # ### end Alembic commands ###
