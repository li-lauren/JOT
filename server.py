from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify, make_response)
from flask_socketio import SocketIO, send, join_room
from newspaper import Article

from model import connect_to_db
import crud
import json

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

            # doc_list = crud.get_docs_owned_by_user_id(user.user_id)
            # print(doc_list)
            # #TO DO: don't send entire docs, just title id, relevant info
            # return jsonify(doc_list)
            return f"Welcome, {user.fname}!"
    
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
    fname = request.json.get('fname')
    lname = request.json.get('lname')
    email = request.json.get('email')
    pw = request.json.get('pw')
    img = request.json.get('img')

    user = crud.get_user_by_email(email)

    if user:
        print('Account already exists')
        return 'An account already exists with that email'
    else:
        crud.create_user(fname, lname, email, pw, img)
        print('Account created')
        return f'Welcome, {fname}!  Your account has been created!  Please log in.'


@app.route('/docs/<doc_id>')
def show_doc(doc_id):
    """Show a JOT-formatted document"""
    #TO DO: Maybe there is a cleaner way to do this
    print('SHOW_DOC')
    doc = crud.get_doc_by_doc_id(doc_id)
    authors = crud.get_author_by_doc_id(doc_id)
    img_urls = crud.get_image_url_by_doc_id(doc_id)

    session['doc_id'] = doc_id

    img_url_list = []
    for img_url in img_urls:
        img_url_list.append(img_url.url)

    author_list = []
    for author in authors:
        author_list.append(author.name)

    return jsonify({
        'doc': doc, 
        'authors': " ".join(author_list), 
        'img_urls': img_url_list
    })


@app.route('/docs', methods=['POST'])
def create_doc():
    """Create a doc from a url."""

    url = request.json.get('url')

    article = Article(url)
    article.download()
    article.parse()

    title = article.title
    publish_date = article.publish_date
    body = article.text
    owner = session['user_id']
    doc = crud.create_doc(url, title, publish_date, body, owner)

    authors = article.authors
    author_list = []
    for name in authors:
        author = crud.create_author(name)
        crud.create_doc_author(doc.doc_id, author.author_id)
        author_list.append(author.name)
    
    img_url = crud.create_img_url(doc.doc_id, article.top_image)
    img_url_list = []
    img_url_list.append(img_url.url)
    
    print(f"Doc created: {doc}")
    return jsonify({
        'doc': doc, 
        'authors': " ".join(author_list), 
        'img_urls': img_url_list
    })


@app.route('/docs')
def get_docs_by_user_id():
    """Get all docs owned by a user."""

    user_id = session['user_id']
    doc_list = crud.get_docs_owned_by_user_id(user_id)

    return jsonify(doc_list)


@app.route('/followed_docs')
def get_followed_docs_by_user_id():
    """Get all docs followed by a user."""

    user_id = session['user_id']
    followed_docs = crud.get_followed_docs_by_user_id(user_id)

    return jsonify(followed_docs)


@app.route('/followers', methods=['POST'])
def create_follower():
    """Create a follower for a doc."""

    doc_id = session['doc_id']
    email = request.json.get('email')

    user = crud.get_user_by_email(email)
    if user:
        follower = crud.create_doc_follower(user.user_id, doc_id)
        print(follower)
        return f"{user.fname} has been added!"
    else:
        return f"No user associated with {email}"


@app.route('/followers')
def get_followers():
    """Get all followers of a doc."""
    
    doc_id = session['doc_id']
    
    followers = crud.get_followers_by_doc_id(doc_id)

    return jsonify(followers)


@app.route('/notes')
def get_notes():
    """Get all of a doc's notes."""
    
    doc_id = session['doc_id']
    notes = crud.get_notes_by_doc_id(doc_id)

    return jsonify(notes)

@app.route('/notes', methods=['POST'])
def create_note():
    """Create a note."""
    
    note = request.json.get("note")
    user_id = session['user_id']
    doc_id = session['doc_id']
    note = crud.create_note(user_id, doc_id, note)
    print(jsonify(note))
    return jsonify(note)


@io.on("connect")
def test_connect():
    print(f"Client connected")

@io.on("disconnect")
def test_disconnect():
    print("Client disconnected")

@io.on("join")
def handle_join_room(room):
    print(f"User is now in Room {room}, SID: {request.sid}")
    join_room(room)
    io.emit('join_msg', room=room)

@io.on("note")
def handle_note(data):
    print(f"Note: {data['note']} Room: {data['room']}")

    note_json = {
        # 'note_id': note_obj.note_id,
        'doc_id': data['room'],
        # 'created_at': note_obj.created_at,
        'body': data['note'],
        'x_pos': 0,
        'y_pos': 0
    }
    io.emit('note', note_json, room=data['room'])

# @io.on("note")
# def handle_note(data):
#     note = data['note']
#     room = data['room']
#     print(f"Note: {note} Room: {room}")
    

#     # user_id = session['user_id']
#     # doc_id = room
#     # note_obj = crud.create_note(user_id, doc_id, note)
#     # print(note_obj)
    
#     # note_json = {
#     #     'note_id': note_obj.note_id,
#     #     'doc_id': note_obj.doc_id,
#     #     # 'created_at': note_obj.created_at,
#     #     'body': note_obj.body,
#     #     'x_pos': note_obj.x_pos,
#     #     'y_pos': note_obj.y_pos
#     # }

#     io.emit('note', note, room=room)

if __name__ == '__main__':
    connect_to_db(app)
    io.run(app, debug=True, host='0.0.0.0')