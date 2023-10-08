#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify, send_from_directory
import os
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError, DataError
from sqlalchemy.orm import subqueryload, load_only
from datetime import datetime

# Local imports
from config import app, db, api, UPLOAD_FOLDER
from models import User, Review, Comment, Game, game_library

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

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return make_response(user.to_dict(), 200)

            return {"error": "Invalid username or password"}, 401

        return {"error": "User not found"}, 404


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
    def get(self):
        pass

    def patch(self):
        data = request.get_json()

        user = User.query.filter(User.id == data["user_id"]).first()

        for game in data["games"]:
            new_game = Game.query.filter(Game.id == game["id"]).first()
            user.library.append(new_game)

        db.session.add(user)
        db.session.commit()

        return user.to_dict(), 200


api.add_resource(GameLibrary, "/library")


class Comments(Resource):
    def get(self):
        comment = [comment.to_dict() for comment in Comment.query.all()]

        return make_response(comment, 201)

    def post(self):
        data = request.get_json()

        new_comment = Comment(
            content=data["content"],
            review_id=data["review_id"],
            user_id=data["user_id"],
        )

        try:
            db.session.add(new_comment)
            db.session.commit()
            return new_comment.to_dict(), 201
        except IntegrityError as e:
            errors = []

            if isinstance(e, (IntegrityError, DataError)):
                for error in e.orig.args:
                    errors.append(str(error))

            return {"errors": errors}, 422


api.add_resource(Comments, "/comments")


class CommentsByID(Resource):
    def delete(self, id):
        comments = Comment.query.filter(Comment.user_id == id).all()

        for comment in comments:
            db.session.delete(comment)

        db.session.commit()

        response_body = {"delete_successful": True, "message": "Comment deleted"}

        response = make_response(response_body, 200)

        return response


api.add_resource(CommentsByID, "/comments/<int:id>")


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


api.add_resource(Reviews, "/reviews")


class ReviewByID(Resource):
    def get(self, id):
        try:
            reviews = Review.query.filter(Review.game_id == id).all()
            reviews_list = [review.to_dict() for review in reviews]

            return reviews_list, 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def delete(self, id):
        review_to_delete = Review.query.filter(Review.id == id).first()

        db.session.delete(review_to_delete)
        db.session.commit()

        response_body = {"delete_successful": True, "message": "Review deleted"}

        response = make_response(response_body, 200)

        return response

    def patch(self, id):
        review_to_patch = Review.query.filter(Review.id == id).first()

        for attr in request.get_json():
            setattr(review_to_patch, attr, request.get_json().get(attr))

        review_to_patch.date_updated = datetime.utcnow()

        db.session.add(review_to_patch)
        db.session.commit()

        review_dict = review_to_patch.to_dict()

        response = make_response(review_dict, 200)

        return response


api.add_resource(ReviewByID, "/reviews/<int:id>")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


@app.route("/check-username/<string:name>")
def check_username(name):
    print(name)
    user = User.query.filter(User.username == name).first()

    if user:
        return {"found": True}, 200
    else:
        return {"found": False}, 404


@app.route("/check-email/<string:email>")
def check_email(email):
    user = User.query.filter(User.email == email).first()

    if user:
        return {"found": True}, 200
    else:
        return {"found": False}, 404


@app.route("/upload-profile-picture/<int:id>", methods=["POST"])
def upload_profile_picture(id):
    try:
        if "file" not in request.files:
            return jsonify({"message": "No file part"}), 400

        file = request.files["file"]

        if file.filename == "":
            return jsonify({"message": "No selected file"}), 400

        file.save(os.path.join(app.config["UPLOAD_FOLDER"], file.filename))

        user = User.query.get(id)
        user.profile_picture = f"/{UPLOAD_FOLDER}/{file.filename}"

        db.session.commit()

        return user.to_dict(), 200

    except ValueError as e:
        return (
            jsonify({"error": str(e)}),
            400,
        )


@app.route("/uploads/profile-pictures/<path:filename>")
def serve_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
