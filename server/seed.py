#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from sqlalchemy.orm import joinedload
from sqlalchemy import text

# Local imports
from app import app
from models import db, User, Game, Review, Comment, game_library

if __name__ == "__main__":
    faker = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        User.query.delete()
        Review.query.delete()
        db.session.commit()
