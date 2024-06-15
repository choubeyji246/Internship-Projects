from flask import make_response, request
from app import app
from validation.login_schema import login_schema_validator
from validation.create_user_schema import create_user_schema_validator
from users.user_model import user_model

user=user_model()

@app.route("/user/register",methods=["POST"])
def user_create_controller():
    isvalid=create_user_schema_validator.validate(request.form)
    if isvalid:
        return user.user_create_model(request.form)
    else:
        return make_response({"message":str(create_user_schema_validator.errors)},400)


@app.route("/user/login",methods=["POST"])
def user_login_controller():
    isvalid=login_schema_validator.validate(request.form)
    if isvalid:
        return user.user_login_model(request.form)
    else:
        return make_response({"message":str(login_schema_validator.errors)},400)