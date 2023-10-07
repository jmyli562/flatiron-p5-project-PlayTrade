# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
import os
from dotenv import load_dotenv

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.secret_key = b'V!\x87\xae\x9d6\xdc\xc0"\xc1\x93\x00-\xa2=\x12'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
UPLOAD_FOLDER = "uploads/profile-pictures"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db, render_as_batch=True)
db.init_app(app)

bcrypt = Bcrypt(app)
# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)
