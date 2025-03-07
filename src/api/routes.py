"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/token", methods=["POST"])
def create_token():
    data = request.get_json()
    email = data.get("email")
    password =data.get("password")

    user = User.query.filter_by(email=email).first()

    if email is None or password is None:
        return jsonify({"msg": "Bad credentials"}), 401
    
    if user.password != password:
        return jsonify({"msg": "Wrong Password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token, "user_id":email})



@api.route("/signup", methods=['POST'])
def add_to_user_database():
    data = request.get_json()
    email = data.get("email")
    password =data.get("password")

    if not data.get("email") and not data.get("password"):
        return jsonify({"message": "Missing Credentials"})
    
    
    new_user = User(email=email, password=password)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message":"User created successfully"})



@api.route("/private", methods=["GET"])
@jwt_required()
def privatepage():
    this_user_id = get_jwt_identity()
    user = User.query.get(this_user_id)
    return jsonify({"id": user.id, "email": user.email }), 200

    
    




