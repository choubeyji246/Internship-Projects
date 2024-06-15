from flask import make_response, send_file
from datetime import datetime, timedelta
import jwt
import hashlib
import mysql.connector
from config.config import dbConfig

class user_model():
    def __init__(self):
        try:
            self.con = mysql.connector.connect(host= dbConfig['DB_HOST'], user= dbConfig['DB_USERNAME'], password=dbConfig["DB_PASSWORD"], database=dbConfig["DB_NAME"])
            self.con.autocommit=True
            self.cur=self.con.cursor(dictionary=True)
            print("connection successfull")
        except:
            print("some error")


    def user_create_model(self,data):
        try:
            password = hashlib.md5(data["password"].encode()).hexdigest()
            self.cur.execute(f"insert into users(name, email ,password) values('{data['name']}','{data['email']}','{password}')")
            return make_response({"message":"user created sucesfully"},201)
        except Exception as e:
            return make_response(str(e),500)
    
    def user_login_model(self,data):
        #qry=f'SELECT id, name, email, avatar, roleId WHERE  email="{data["email"]}" AND password="{data["password"]}" '
        try:
            password = hashlib.md5(data["password"].encode()).hexdigest()
            self.cur.execute(f'SELECT id, name, email FROM users WHERE  email="{data["email"]}" AND password="{password}" ')
            result = self.cur.fetchall()
            userData=result[0]
            exp_time=datetime.now() + timedelta(minutes=60)
            exp_epoch_time= int(exp_time.timestamp())
            payload={"payload":userData, "exp":exp_epoch_time}
            token=jwt.encode(payload,dbConfig["JWT_SECRET"],algorithm="HS256")
            return make_response({"message":"login successful", "token":token}, 200)
        except Exception as e:
            return make_response(str(e),500)