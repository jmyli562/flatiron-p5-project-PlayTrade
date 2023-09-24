#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError, DataError

# Local imports
from config import app, db, api
from models import User, Review, Comment, Game

# Add your model imports

# Views go here!


class User(Resource):
    def get(self):
        pass

    # adding a new user to the database
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

    # will be used to update the attributes of the user in the database (points)
    def patch(self):
        pass


api.add_resource(User, "/users")


class UserByID(Resource):
    def get(self):
        pass


api.add_resource(UserByID, "/users/<int:id>")


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        password = data["password"]

        user = User.query.filter(User.username == password).first()

        if user.authenticate(password):
            session["user_id"] = user.id

            auth_user = {
                "username": user.username,
                "email": user.email,
                "points": user.points,
            }

            return make_response(auth_user.to_dict(), 200)

        return {"error": "Invalid username or password"}, 401


api.add_resource(Login, "/login")


class Logout(Resource):
    def delete(self):
        pass


api.add_resource(Logout, "/logout")


class GameLibrary(Resource):
    def get(self, id):
        pass

    def post(self):
        pass


api.add_resource(GameLibrary, "/<int:id>/library")


class Comment(Resource):
    def get(self, id):
        pass

    def post(self, id):
        pass

    def patch(self, id):
        pass

    def delete(self, id):
        pass


api.add_resource(Comment, "/")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
