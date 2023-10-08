from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt
import os

# Models go here!

game_library = db.Table(
    "game_library",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id", ondelete="CASCADE")),
    db.Column("game_id", db.Integer, db.ForeignKey("games.id")),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    profile_picture = db.Column(db.String)
    library = db.relationship(
        "Game", secondary=game_library, back_populates="owners", lazy="dynamic"
    )
    review = db.relationship("Review", backref="user")
    comment = db.relationship("Comment", backref="user")
    points = db.Column(db.Integer)
    _password_hash = db.Column(db.String)

    serialize_rules = ("-_password_hash",)

    @hybrid_property  # restrict access to the password hash
    def password_hash(self):
        raise Exception("Hashed password may not be viewed.")

    @password_hash.setter  # Generate a Bcrypt password hash and set it to the _password_hash attribute
    def password_hash(self, password):
        bcrypt_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        self._password_hash = bcrypt_hash

    # checking if the provided password matches the one stored in the db
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    @validates("email")
    def validate_email(self, key, value):
        if "@" not in value or ".com" not in value:
            raise ValueError("Invalid email. Validation failed.")
        return value

    @validates("username")
    def validate_username(self, key, value):
        if value == "":
            raise ValueError("Username must not be blank.")
        return value

    @validates("password")
    def validate_password(self, key, value):
        if value == "":
            raise ValueError("Password must not be blank.")
        return value

    @validates("profile_picture")
    def validate_profile_picture(self, key, value):
        allowed_extensions = [".jpg", ".jpeg", ".png"]

        file_extension = os.path.splitext(value)[1].lower()

        if file_extension not in allowed_extensions:
            raise ValueError("Invalid image file format")

        return value


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    posted_at = db.Column(db.DateTime, default=datetime.utcnow)
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    serialize_rules = (
        "-review",
        "-user.library",
        "-user.review",
        "-user.comment",
    )


class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    release_date = db.Column(db.String)
    image_url = db.Column(db.String)
    rating = db.Column(db.Integer)
    price = db.Column(db.Integer)
    owners = db.relationship(
        "User", secondary=game_library, back_populates="library", lazy="dynamic"
    )
    reviews = db.relationship("Review", backref="game", lazy="select")

    serialize_rules = ("-owners",)


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    comment = db.relationship("Comment", backref="review")
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    date_updated = db.Column(db.DateTime, default=None, nullable=True)

    serialize_rules = (
        "-user.library",
        "-user.review",
        "-user.comment",
        "-game",
    )
