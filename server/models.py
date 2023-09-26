from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt

# Models go here!

game_library = db.Table(
    "game_library",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("game_id", db.Integer, db.ForeignKey("games.id")),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    library = db.relationship(
        "Game", secondary=game_library, back_populates="owners", lazy="dynamic"
    )
    review = db.relationship("Review", backref="user")
    comment = db.relationship("Comment", backref="user")
    points = db.Column(db.Integer)
    _password_hash = db.Column(db.String)

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


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    posted_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))


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
    reviews = db.relationship("Review", backref="game")


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    comment = db.relationship("Comment", backref="review")
