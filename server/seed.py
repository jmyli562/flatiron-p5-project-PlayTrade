#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Game, Review, Comment, game_library

if __name__ == "__main__":
    faker = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        # User.query.delete()
        # Review.query.delete()
        # Comment.query.delete()
        user = User.query.filter(User.id == 2).first()
        user.library = []
        db.session.commit()
