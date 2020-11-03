from flask import (Flask, render_template, request, flash, session,
                   redirect)
from flask_socketio import SocketIO, send, join_room

import os

SECRET_KEY = os.environ['SECRET_KEY']

app = Flask(__name__)
app.secret_key = SECRET_KEY

io = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    io.run(app, debug=True, host='0.0.0.0')