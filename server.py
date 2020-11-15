from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify, make_response)
from flask_socketio import SocketIO, send, join_room, emit
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


@app.route('/login')
def check_login():
    return str(session.get('user_id', ''))


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
            print(session)

            # return f"Welcome, {user.fname}!"
            return f"{user.user_id} {user.fname} {user.lname}"
    
        else:
            return "Incorrect password"
    else:
        return "No user associated with that email"

@app.route('/logout')
def logout():
    session.clear()
    print(f"CLEAR SESSION: {session}")

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

    article = Article(url, keep_article_html=True)
    article.download()
    article.parse()

    title = article.title
    publish_date = article.publish_date
    body = str(article.article_html)
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
    
    return jsonify(note)


@io.on("connect")
def test_connect():
    print(f"Client connected")

@io.on("disconnect")
def test_disconnect():
    print("Client disconnected")

lastPos = { 'x': 0, 'y': 0}

@io.on("join")
def handle_join_room(room):
    print(f"User {session['user_id']} is now in Room {room}, SID: {request.sid}")
    session[request.sid] = session['user_id']
    print(session)
    join_room(room)
    io.emit('join_msg', room=room)
    # io.emit('update_position', lastPos, room=room)

@io.on("note")
def handle_note(data):
    body = data['note']
    room = data['room']
    x_pos = data['x_pos']
    y_pos = data['y_pos']
    user_id = session[request.sid]
    print(f"Note: {body} Room: {room} User: {user_id} X: {x_pos} Y: {y_pos}")
    print(f"NAME {crud.get_user_by_id(user_id).fname}")

    user = crud.get_user_by_id(user_id)
    fname = user.fname
    lname = user.lname

    note = crud.create_note(user_id, room, body)

    note_json = {
        'note_id': note.note_id,
        'user_id': user_id,
        'doc_id': room,
        # TODO: work on datetime ish
        # 'created_at': note_obj.created_at, 
        'body': body,
        'x_pos': x_pos,
        'y_pos': y_pos
    }
    # io.emit('note', note_json, room=room)
    io.emit('note', note_json, room=room)


# @io.on("update_position")
# def update_position():
#     io.emit("update_position", lastPos)

# @io.on("receive_position")
# def receive_position(data):
#     print(f"data_x : {data['x']}")
#     print(f"data_y : {data['y']}")
#     print(session['doc_id'])
#     lastPos = data
#     io.emit('receive_position', data, room=session['doc_id'])

def emit_check():
    print('Data was received')

@io.on("fin_pos")
def fin_pos(data):
    """Read in emitted x, y positions for a specific note, and then emit back 
    to connected clients."""

    note_id = data['note_id']
    new_x = data['x']
    new_y = data['y']
    room = data['room']

    print(f"data_note: {note_id}")
    print(f"data_x : {new_x}")
    print(f"data_y : {new_y}")
    print(f"Room: {room}")
    crud.update_note_pos(note_id, new_x, new_y)

    # io.emit("fin_pos", data, room=session['doc_id'])
    # send(data, broadcast=True)

    # emits to initiator
    # emit("fin_pos", data, callback=emit_check) 

    # successfully emits to everybody
    #emit("fin_pos", data, broadcast=True)

    io.emit("fin_pos", data, room=room, include_self=False)


if __name__ == '__main__':
    connect_to_db(app)
    io.run(app, debug=True, host='0.0.0.0')