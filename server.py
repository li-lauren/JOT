from flask import (Flask, render_template, request, flash, session,
                   redirect)
from flask_socketio import SocketIO, send, join_room
from model import connect_to_db
import crud

import os

SECRET_KEY = os.environ['SECRET_KEY']

app = Flask(__name__)
app.secret_key = SECRET_KEY

io = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    pw = request.form.get('password')

    print(email)

    user = crud.get_user_by_email(email)

    if user:
        if user.pw == pw:
            session['user_id'] = user.user_id
            session['fname'] = user.fname
            session['lname'] = user.lname
            #flash('Logged in!')
            print(session)
    
        else:
            flash('Incorrect password')
    else:
        flash('No user associated with that email')

    return redirect('/')

@app.route('/users', methods=['POST'])
def register_user():
    """Create a new user."""
    fname = request.form.get('fname')
    lname = request.form.get('lname')
    email = request.form.get('email')
    pw = request.form.get('pw')

    user = crud.get_user_by_email(email)

    if user:
        flash('An account already exists with that email')
    else:
        crud.create_user(fname, lname, email, pw)
        flash('Account created!  Please log in.')

    return redirect('/')


if __name__ == '__main__':
    connect_to_db(app)
    io.run(app, debug=True, host='0.0.0.0')