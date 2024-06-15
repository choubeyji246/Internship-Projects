from functools import wraps
from flask import json, make_response, request
import jwt
import mysql.connector
from config.config import dbConfig

class auth_model():
    def __init__(self):
        try:
            self.con = mysql.connector.connect(host= dbConfig['DB_HOST'], user = dbConfig['DB_USERNAME'], password=dbConfig["DB_PASSWORD"], database=dbConfig["DB_NAME"])
            self.con.autocommit=True
            self.cur=self.con.cursor(dictionary=True)
            #print("connection successfull")
        except:
            print("some error from authentication")

    def token_auth(self):
        def inner1(func):
            @wraps(func)
            def inner2(*args,**kwargs):
                authorization=request.headers.get("authorization")
                if authorization:
                    try:
                        decodedData= jwt.decode(authorization,dbConfig["JWT_SECRET"], algorithms="HS256")
                    except jwt.ExpiredSignatureError:
                        return make_response({"Error":"token expired"},401)
                    user_id=decodedData['payload']['id']
                    if user_id:
                        return func(user_id,*args,**kwargs)
                    else:
                        return make_response({"Error":"UNAUTHORIZED"},404)
                else:
                    return make_response({"Error":"token not provided"},401)
            return inner2
        return inner1