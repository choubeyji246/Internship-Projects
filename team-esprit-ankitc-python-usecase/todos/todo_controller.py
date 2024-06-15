from flask import request
from app import app
from users.user_model import user_model
from todos.todo_model import todo_model
from auth.auth_model import auth_model

todo=todo_model()
auth=auth_model()

@app.route("/todo/create",methods=["POST"])
@auth.token_auth()
def tode_create_controller(user_id):
    return todo.todo_create_model(request.form,user_id)

@app.route("/todo/update/<todo_id>",methods=["PATCH"])
@auth.token_auth()
def todo_update_controller(authenticated_user,todo_id):
    return todo.todo_update_model(request.form,authenticated_user,todo_id)


@app.route("/todo/complete/<todo_id>",methods=["PATCH"])
@auth.token_auth()
def todo_complete_controller(user_id,todo_id):
    return  todo.todo_complete_model(user_id,todo_id)

@app.route("/todo/delete/",methods=["DELETE"])
@auth.token_auth()
def todo_delete_controller(user_id):
    return todo.todo_delete_model(user_id,request.form)


@app.route("/todo/getall",methods=["GET"])
@auth.token_auth()
def  get_all_todo_controller(user_id):
    return todo.get_all_todos_model(user_id)
