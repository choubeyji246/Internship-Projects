from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "hello world!"

@app.route('/about')
def about():
    return "hello about!"

from users import user_controller
from todos import todo_controller
# if __name__=='__main__':
#     app.run(debug=True)