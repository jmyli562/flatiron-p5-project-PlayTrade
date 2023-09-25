#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError, DataError

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
        pass

    # will be used to update the attributes of the user in the database (points)
    def patch(self, id):
        pass


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
            return make_response(user.to_dict())
        else:
            return jsonify({"message": "401: Not Authorized"}), 401


api.add_resource(CheckSession, "/check_session")


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


api.add_resource(Comment, "/comments")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
