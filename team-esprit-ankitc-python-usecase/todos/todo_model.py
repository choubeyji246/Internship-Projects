from flask import make_response
import mysql.connector
from config.config import dbConfig

class todo_model():
    def __init__(self):
        try:
            self.con = mysql.connector.connect(host= dbConfig['DB_HOST'], user= dbConfig['DB_USERNAME'], password=dbConfig["DB_PASSWORD"], database=dbConfig["DB_NAME"])
            self.con.autocommit=True
            self.cur=self.con.cursor(dictionary=True)
        except:
            print("some error from todo")
    
    def todo_create_model(self,data,user_id):
        try:
            self.cur.execute(f"insert into todo(todo_name, todo_desc, user_id ) values('{data['todo_name']}','{data['todo_desc']}',{user_id})")
            return make_response({"message":"todo created sucesfully"},201)
        except Exception as e:
            return make_response(str(e),500)
    def todo_update_model(self,data,authenticated_user,todo_id):
        try:
            authorized_user=f'{data["user_id"]}' 
            if authenticated_user != int(authorized_user):
                return make_response({"message":"unauthorized"},401)
            else:
                qry = "UPDATE todo SET "
                for key in data:
                    qry+= f"{key} = '{data[key]}',"
                qry= qry[:-1] +  f" WHERE user_id = {authenticated_user} AND id = {todo_id}"
            #print(qry)
                self.cur.execute(qry)
                if self.cur.rowcount>0:
                    return make_response({"message":"todo updated successfully"},200)
                else:
                    return make_response({"message":"Data updation failed"},202)
        except Exception as e:
            return make_response(str(e),500)
    
    def todo_complete_model(self,authenticated_user,todo_id):
        try:
            self.cur.execute(f"UPDATE todo SET isCompleted = 1 WHERE user_id = {authenticated_user} AND id={todo_id}")
            if self.cur.rowcount>0:
                return make_response({"message":"todo updated successfully"},200)
            else:
                return make_response({"message":"something went wrong while updating"},202)
        except Exception as e:
            return make_response(str(e),500)
    def todo_delete_model(self,authenticated_user,data):
        #print(data['todo_id'])
        try:
            self.cur.execute(f"UPDATE todo SET isArchived = 0 WHERE user_id = {authenticated_user} AND id={data['todo_id']}")
            if self.cur.rowcount>0:
                return make_response({"message":"todo deleted successfully"},200)
            else:
                return make_response({"message":"something went wrong while deleting"},202)
        except Exception as e:
            return make_response(str(e),500)
        
    def  get_all_todos_model(self,authenticated_user):
        try:
            self.cur.execute(f'SELECT id, todo_name, todo_desc, isCompleted, createdAt, updatedAt FROM todo WHERE user_id = {authenticated_user} AND isArchived = 1')
            result = self.cur.fetchall()
            if len(result)>0:
                return make_response({"payload":result},200)
            else:
                return make_response({"message":"No Data Found"},204)
        except Exception as e:
            return make_response(str(e),500)
