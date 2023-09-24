#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Game, Review, Comment

if __name__ == "__main__":
    faker = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        User.query.delete()
        Game.query.delete()
        Review.query.delete()
        Comment.query.delete()

        for _ in range(20):
            username = faker.profile(fields=["username"])["username"]

            user = User(username=username)
            user.password_hash = username
            db.session.add(user)
            db.session.commit()
