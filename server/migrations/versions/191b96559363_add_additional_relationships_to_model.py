"""add additional relationships to model

Revision ID: 191b96559363
Revises: 51679f8c5ae0
Create Date: 2023-09-26 03:01:29.110569

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '191b96559363'
down_revision = '51679f8c5ae0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('game_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_reviews_game_id_games'), 'games', ['game_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_reviews_game_id_games'), type_='foreignkey')
        batch_op.drop_column('game_id')

    # ### end Alembic commands ###
