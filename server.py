from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify, make_response)
from flask_socketio import SocketIO, send, join_room, emit
from newspaper import Article

from model import connect_to_db
import crud
import json
import datetime, time
from trie import Trie

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
            return f"{user.user_id} {user.fname} {user.lname} {user.email}"
    
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
        crud.create_user(fname, lname, email, pw, img, email_trie)
        print('Account created')
        return f'Welcome, {fname}!  Your account has been created!  Please log in.'


@app.route('/docs/<doc_id>')
def show_doc(doc_id):
    """Show a JOT-formatted document"""
    #TODO: Check if there is a cleaner way to do this
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


# @app.route('/followers', methods=['POST'])
# def create_follower():
#     """Create a follower for a doc."""

#     doc_id = session['doc_id']
#     email = request.json.get('email')

#     user = crud.get_user_by_email(email)
#     if user:
#         follower = crud.create_doc_follower(user.user_id, doc_id)
#         print(follower)
#         return f"{user.fname} has been added!"
#     else:
#         return f"No user associated with {email}"


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


@app.route('/invitations')
def get_invitations():
    """Get all of a user's article invitations."""
    user_id = session['user_id']
    invites = crud.get_invites_by_user_id(user_id)
    
    return jsonify(invites)

@app.route('/decline', methods=['POST'])
def decline_invitations():
    
    follow_id = request.json.get('followId')
    crud.decline_invite_by_follow_id(follow_id)

    return 'Invite declined'


@app.route('/likes', methods=['POST'])
def get_like_info():

    note_id = request.json.get('note_id')
    user_id = request.json.get('user_id')

    num_likes = crud.get_num_likes_by_note_id(note_id)
    liked_by_user = crud.get_if_user_likes_a_note(user_id, note_id)

    return { 'numLikes': num_likes, 'likedByUser': liked_by_user }



@app.route('/user/<int:user_id>')
def get_user_profile(user_id):
    """Get profile stats for a user."""

    total_likes = crud.get_total_num_likes(user_id)
    top_note, top_note_likes = crud.get_most_liked_note(user_id)
    top_doc, top_doc_followers = crud.get_most_followed_doc(user_id)

    stats = {
        'totalLikes': total_likes,
        'topNote': top_note,
        'topNoteLikes': top_note_likes,
        'topDoc' : top_doc,
        'topDocFollowers': top_doc_followers
    }
    
    return jsonify(stats)


@app.route('/profile/<email>')
def get_user_info(email):
    """Get another user's info."""

    user = crud.get_user_by_email(email)
    user_id = user.user_id 

    total_likes = crud.get_total_num_likes(user_id)
    top_note, top_note_likes = crud.get_most_liked_note(user_id)
    top_doc, top_doc_followers = crud.get_most_followed_doc(user_id)

    stats = {
        'user': user,
        'totalLikes': total_likes,
        'topNote': top_note,
        'topNoteLikes': top_note_likes,
        'topDoc' : top_doc,
        'topDocFollowers': top_doc_followers
    }
    
    return jsonify(stats)


@app.route('/friend/<int:user_id>')
def check_if_friends(user_id):
    curr_user_id = session['user_id']
    other_user_id = user_id

    data = {'isFriends' : crud.check_if_friends(curr_user_id, other_user_id)}

    return jsonify(data)


@app.route('/tag/<int:doc_id>')
def get_tags(doc_id):
    
    tags = crud.get_tags_by_doc_id(doc_id)

    return jsonify(tags)


@app.route('/tag')
def get_tag_lib():
    user_id = session['user_id']
    tagLib = crud.get_all_tags(user_id)

    return jsonify(tagLib)

@app.route('/docs/tags/<int:tag_id>')
def filter_docs_by_tag(tag_id):
    user_id = session['user_id']
    owned_docs_with_tag = crud.get_owned_docs_by_tag_id(tag_id, user_id)
    followed_docs_with_tag = crud.get_followed_docs_by_tag_id(tag_id, user_id)

    docs = {
        'ownedDocsWithTag': owned_docs_with_tag,
        'followedDocsWithTag': followed_docs_with_tag
    }

    return jsonify(docs)

@app.route('/requests')
def get_friend_reqs():
    user_id = session['user_id']
    reqs = crud.get_incoming_reqs(user_id)

    return jsonify(reqs)


@app.route('/requests/decline/<int:req_id>')
def decline_friend_req(req_id):

    crud.decline_friend_req(req_id)

    return "Friend req declined"


@app.route('/friends')
def get_friends():
    """Get all of a user's friends."""
    
    user_id = session['user_id']
    friends = crud.get_friends_by_user_id(user_id)

    return jsonify(friends)





    



###### SOCKET FUNCTIONS #########

@io.on("connect")
def test_connect():
    print(f"Client connected")

@io.on("disconnect")
def test_disconnect():
    print("Client disconnected")

lastPos = { 'x': 0, 'y': 0}

@io.on("join")
def handle_join_room(room):
    """Add user to the session when they join a room"""
    user_id = session['user_id']
    print(f"User {session['user_id']} is now in Room {room}, SID: {request.sid}")
    session[request.sid] = user_id
    print(session)
    join_room(room)
    user = crud.get_user_by_id(user_id)
    msg = f"{user.fname} is here to Jot!"
    io.emit('join_msg', msg, room=room, include_self=False)
    # io.emit('update_position', lastPos, room=room)

@io.on("leave")
def handle_leave_room(room):
    """Remove user from session when they leave a room"""
    user_id = session['user_id']
    user = crud.get_user_by_id(user_id)
    msg = f"{user.fname} has left"
    print(msg)
    del session[request.sid]
    io.emit('leave_msg', msg, room=room, include_self=False)

@io.on("note")
def handle_note(data):
    """Receive emitted note data, creates a new note, & emit to others in the room"""
    body = data['note']
    room = data['room']
    x_pos = data['x_pos']
    y_pos = data['y_pos']
    user_id = session[request.sid]
    print(f"Note: {body} Room: {room} User: {user_id} X: {x_pos} Y: {y_pos}")
    # print(f"NAME {crud.get_user_by_id(user_id).fname}")

    user = crud.get_user_by_id(user_id)
    fname = user.fname
    lname = user.lname

    created_at = datetime.datetime.utcnow()
    date_as_int = int(time.mktime(created_at.timetuple())) * 1000

    note_info = crud.create_note(user_id, room, created_at, body, x_pos, y_pos, fname, lname)
    color = note_info['color']
    note = note_info['note']

    note_json = {
        'note_id': note.note_id,
        'user_id': user_id,
        'doc_id': room,
        'created_at': date_as_int, 
        'body': body,
        'x_pos': x_pos,
        'y_pos': y_pos, 
        'fname': fname,
        'lname': lname, 
        'color': color
    }
    
    io.emit('note', note_json, room=room)


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


@io.on("invite_to_follow")
def invite_to_follow(data):
    email = data['email']
    print(f"EMAIL {email}")
    doc_id = data['doc_id']
    print('DOC ID for invite to follow')
    print(doc_id)
    invite_msg = data['msg']
    inviter_id = session['user_id']
    doc = crud.get_doc_by_doc_id(doc_id)
    title = doc.title
    inviter = crud.get_user_by_id(inviter_id)

    user = crud.get_user_by_email(email)

    if user:
        follower = crud.create_doc_follower(user.user_id, doc_id, invite_msg)
        print(follower)
        msg = f"{inviter.fname} {inviter.lname} shared '{title}' with you"
        pkg = {
            'invitee': user.user_id, 
            # 'inviter_fname': inviter.fname,
            # 'inviter_lname': inviter.lname,
            # 'title': title, 
            'msg': msg,
            'follow_id': follower.doc_follower_id }
        io.emit("invite", pkg, include_self=False)
    else:
        msg = f"No user associated with {email}"
        #TODO: Finish this case

@io.on("accept_invite")
def accept_invite(data):
    follow_id = data['followId']
    msg = data['msg']

    inviter = crud.accept_invite_by_follow_id(follow_id)
    print('accept-invite')
    notification = {
        'msg': msg,
        'inviter': inviter.user_id,
        'follower': session['user_id']
    }
    io.emit("invite_accepted", notification)

@io.on("like_note")
def like_note(data):
    note_id = data['note_id']
    user_id = data['user_id']

    crud.create_like(user_id, note_id)
    new_num_likes = crud.get_num_likes_by_note_id(note_id)

    data = {'numLikes': new_num_likes, 
        'liked': True, 
        'noteId': note_id}

    io.emit("note_liked", data)


@io.on("unlike_note")
def unlike_note(data):
    note_id = data['note_id']
    user_id = data['user_id']

    crud.unlike(user_id, note_id)

    new_num_likes = crud.get_num_likes_by_note_id(note_id)

    data = {'numLikes': new_num_likes, 
        'liked': False, 
        'noteId': note_id}

    io.emit("note_unliked", data)


@io.on("note_color")
def set_note_color(data):
    user_id = session['user_id']
    doc_id = data['doc_id']
    color = data['note_color']

    crud.update_note_color(user_id, doc_id, color)

    io.emit("note_color_changed", {'color': color}, room=doc_id)


@io.on("search")
def get_autocomplete_results(data):
    user_id = data['user_id']
    search_term = data['search_term']

    options = crud.get_user_email_matches(search_term, email_trie)

    io.emit("autocomplete", {'user_id':user_id, 'options':options}, room=request.sid)


@io.on("req_friend")
def create_friend_req(data):
    acceptor_id = data['acceptor_id']
    inviter_id = data['inviter_id']

    inviter = crud.get_user_by_id(inviter_id)

    msg = f"New Friend Request from {inviter.fname} {inviter.lname}"

    crud.create_friend_req(inviter_id, acceptor_id)

    io.emit("friend_requested", {'msg' : msg, 'acceptor_id' : acceptor_id})

@io.on("accept_friend_req")
def accept_friend(data):
    req_id = data['req_id']

    new_relationship = crud.add_friend(req_id)

    acceptor = crud.get_user_by_id(new_relationship.acceptor)
    inviter = crud.get_user_by_id(new_relationship.inviter)

    msg = f"{acceptor.fname} {acceptor.lname} accepted your friend request"

    io.emit("friend_added", {'msg':msg, 'inviter_id': inviter.user_id})

@io.on("doc_search")
def get_autocomplete_doc_results(data):
    
    search_term = data['search_term']
    user_id = data['user_id']

    if search_term:
        options = crud.get_doc_matches(search_term, user_id)
    else:
        options = []

    
    
    io.emit("docMatches", {'search_term':search_term,'options':options}, room=request.sid)

   
@io.on("add_tag")
def add_tag(data):
    tag_txt = data['tag']
    doc_id = data['doc_id']
    existing_tag = crud.check_existing_tag(tag_txt)
    print(existing_tag)
    
    if existing_tag:
        print(existing_tag.tag_id) 
        crud.create_doc_tag(doc_id, existing_tag.tag_id)

    else:
        new_tag = crud.create_tag(tag_txt)
        crud.create_doc_tag(doc_id, new_tag.tag_id)


    io.emit("tag_added", room=doc_id)


@io.on("accept_friend_request")
def accept_friend_request(data):
    req_id = data['req_id']

    relationship = crud.add_friend(req_id)
    inviter = crud.get_user_by_id(relationship.inviter)
    # acceptor = crud.get_user_by_id(relationship.acceptor)

    io.emit("friend_added", {'inviter_id':inviter.user_id})















email_trie = Trie()

if __name__ == '__main__':
    connect_to_db(app)

    emails = crud.get_all_emails()
    for email in emails:
        email_trie.insert(email[0])
        
    io.run(app, debug=True, host='0.0.0.0')