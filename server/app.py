#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError, DataError
from sqlalchemy.orm import subqueryload, load_only

# Local imports
from config import app, db, api
from models import User, Review, Comment, Game

# Add your model imports

# Views go here!


class Users(Resource):
    def get(self):
        # serializing the user
        users = [user.to_dict() for user in User.query.all()]

        return make_response(users, 201)


api.add_resource(Users, "/users")


class UserByID(Resource):
    def get(self, id):
        try:
            user = User.query.filter(User.id == id).first()

            return user.to_dict(), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # will be used to update the attributes of the user in the database (points)
    def patch(self, id):
        user = User.query.filter(User.id == id).first()

        for attr in request.get_json():
            setattr(user, attr, request.get_json().get(attr))

        db.session.add(user)
        db.session.commit()

        user_dict = user.to_dict()

        response = make_response(user_dict, 200)

        return response


api.add_resource(UserByID, "/users/<int:id>")


class Signup(Resource):
    def post(self):
        data = request.get_json()

        user = User(
            username=data["username"],
            email=data["email"],
            points=0,
        )

        user.password_hash = data["password"]
        try:
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return user.to_dict(), 201
        except IntegrityError as e:
            errors = []

            if isinstance(e, (IntegrityError, DataError)):
                for error in e.orig.args:
                    errors.append(str(error))

            return {"errors": errors}, 422


api.add_resource(Signup, "/signup")


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        password = data["password"]

        user = User.query.filter(User.username == username).first()

        if user.authenticate(password):
            session["user_id"] = user.id

            return make_response(user.to_dict(), 200)

        return {"error": "Invalid username or password"}, 401


api.add_resource(Login, "/login")


class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()

        if user:
            return jsonify(user.to_dict())
        else:
            return make_response(jsonify({"message": "401: Not Authorized"}), 401)


api.add_resource(CheckSession, "/check_session")


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return 204


api.add_resource(Logout, "/logout")


class Games(Resource):
    def get(self):
        games = Game.query.all()

        serialized_games = [game.to_dict() for game in games]

        return make_response(serialized_games, 201)

    def post(self):
        data = request.get_json()

        name = data["name"]
        release_date = data["released"]
        image_url = data["background_image"]
        rating = data["rating"]

        new_game = Game(
            name=name,
            release_date=release_date,
            image_url=image_url,
            price=60,
            rating=rating,
        )

        try:
            db.session.add(new_game)
            db.session.commit()
            return new_game.to_dict(), 201
        except IntegrityError as e:
            errors = []

            if isinstance(e, (IntegrityError, DataError)):
                for error in e.orig.args:
                    errors.append(str(error))

            return {"errors": errors}, 422


api.add_resource(Games, "/games")


class GameLibrary(Resource):
    def get(self, id):
        pass

    def post(self):
        pass


api.add_resource(GameLibrary, "/<int:id>/library")


class Comments(Resource):
    def get(self, id):
        pass

    def post(self, id):
        pass

    def patch(self, id):
        pass

    def delete(self, id):
        pass


api.add_resource(Comments, "/comments")


class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()

        serialized_reviews = [review.to_dict() for review in reviews]

        return make_response(serialized_reviews, 201)

    def post(self):
        data = request.get_json()

        rating = data["rating"]
        content = data["content"]
        user_id = data["user_id"]
        game_id = data["game_id"]

        review = Review(
            content=content, rating=rating, user_id=user_id, game_id=game_id
        )

        try:
            db.session.add(review)
            db.session.commit()
            return review.to_dict(), 201
        except IntegrityError as e:
            errors = []

            if isinstance(e, (IntegrityError, DataError)):
                for error in e.orig.args:
                    errors.append(str(error))

            return {"errors": errors}, 422

    def patch(self):
        pass

    def delete(self):
        pass


api.add_resource(Reviews, "/reviews")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
