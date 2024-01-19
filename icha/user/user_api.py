from dataclasses import asdict

from flask import request
from flask_jwt_extended import jwt_required

from app import app


@app.route("/api/user", methods=["POST"])
@jwt_required()
def post_user():
    user_json = UserBody(**request.json)
    return asdict(
        UserManager.create(user_json)
    )


@app.route("/api/user/<int:id>", methods=["PUT"])
@jwt_required()
def put_user(id: int):
    user_json = UserBody(**request.json)
    UserManager.edit(user_json, id)
    return {}


@app.route("/api/user/self", methods=["GET"])
@jwt_required()
def get_user():
    return asdict(
        UserManager.current_user()
    )


@app.route("/api/user", methods=["GET"])
@jwt_required()
def get_users():
    result = list[dict]()
    for user in UserManager.gets(
            page=request.args.get("page", 0, int),
            size=request.args.get("size", 10, int)
    ):
        result.append(asdict(user))
    return result
