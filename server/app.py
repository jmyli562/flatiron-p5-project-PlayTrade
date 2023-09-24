#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

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
        pass

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
        pass


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
