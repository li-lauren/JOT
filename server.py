from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from flask_socketio import SocketIO, send, join_room
import newspaper

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

    email = request.json.get('email')
    pw = request.json.get('pw')

    user = crud.get_user_by_email(email)
   
    if user:
        if user.pw == pw:
            session['user_id'] = user.user_id
            session['fname'] = user.fname
            session['lname'] = user.lname
            #flash('Logged in!')
            print(session)

            doc_list = crud.get_docs_owned_by_user_id(user.user_id)
            print(doc_list)
            #TO DO: don't send entire docs, just title id, relevant info
            return jsonify(doc_list)
    
        else:
            #flash('Incorrect password')
            return "Incorrect password"
    else:
        # flash('No user associated with that email')
        return "No user associated with that email"

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

@app.route('/docs/<doc_id>')
def show_doc(doc_id):
    """Show a JOT-formatted document"""
    #TO DO: Maybe there is a cleaner way to do this
    print('SHOW_DOC')
    doc = crud.get_doc_by_doc_id(doc_id)
    authors = crud.get_author_by_doc_id(doc_id)

    author_list = []
    for author in authors:
        author_list.append(author.name)

    return jsonify({'doc': doc, 'authors': " ".join(author_list)})



if __name__ == '__main__':
    connect_to_db(app)
    io.run(app, debug=True, host='0.0.0.0')