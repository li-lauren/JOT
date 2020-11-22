"""CRUD operations."""

from datetime import datetime
import pytz
from sqlalchemy import func

from model import (db, connect_to_db, User, Doc, Author, Doc_Author, Img_Url,
                    Tag, Doc_Tag, Doc_Follower, Note, Like, Relationship_Type,
                    User_Relationship)

from trie import Trie

if __name__ == '__main__':
    from server import app
    connect_to_db(app)


### USER CRUD OPS ###

# Initiate a trie to store user emails
# email_trie = Trie()

def create_user(fname, lname, email, pw, img, trie):
    """Create and return a new user."""

    user = User(
        fname = fname,
        lname = lname,
        email = email,
        pw = pw,
        img = img
    )

    trie.insert(email.lower())
    db.session.add(user)
    db.session.commit()

    return user


def get_users():
    """Return all users."""

    return User.query.all()


def get_user_by_id(user_id):
    """Return a user by user_id."""

    return User.query.get(user_id)


def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()

def get_all_emails():
    """Return a list of all emails."""

    return db.session.query(User.email).all()


def get_user_email_matches(search_term, trie):
    """Get autocomplete results for a user email query."""

    matches = trie.search(search_term.lower())

    return matches


### DOC CRUD OPS ###
def create_doc(url, title, publish_date, body, owner):
    """Create a document."""
    
    tz = pytz.timezone('America/Los_Angeles')
    created_at = datetime.now(tz)

    doc = Doc(
        url = url,
        title = title,
        publish_date = publish_date,
        body = body,
        owner = owner,
        created_at = created_at
    )

    db.session.add(doc)
    db.session.commit()

    return doc


def create_author(name=''):
    """Create an author."""
    
    author = Author(
        name = name
    )

    db.session.add(author)
    db.session.commit()

    return author


def create_doc_author(doc_id, author_id):
    """Create a doc-to-author relationship."""

    doc_author = Doc_Author(
        doc_id = doc_id,
        author_id = author_id
    )

    db.session.add(doc_author)
    db.session.commit()

    return doc_author


def create_img_url(doc_id, url):
    """Create an img url."""

    img_url = Img_Url(
        doc_id = doc_id,
        url = url
    )

    db.session.add(img_url)
    db.session.commit()

    return img_url


def create_tag(tag):
    """Create a tag."""

    tag = Tag(tag = tag)

    db.session.add(tag)
    db.session.commit()

    return tag


def create_doc_tag(doc_id, tag_id):
    """Create a document to tag relationship."""

    doc_tag = Doc_Tag(
        doc_id = doc_id,
        tag_id = tag_id
    )

    db.session.add(doc_tag)
    db.session.commit()

    return doc_tag



def get_docs_owned_by_user_id(user_id):
    """Return all docs belonging to user_id."""

    return Doc.query.filter(Doc.owner == user_id).all()


def get_doc_by_doc_id(doc_id):
    """Return document given a doc id."""
    
    return Doc.query.get(doc_id)

### FOLLOWER CRUD OPERATIONS ###

def create_doc_follower(user_id, doc_id):
    """Create a document-follower relationship."""

    tz = pytz.timezone('America/Los_Angeles')
    created_at = datetime.now(tz)

    doc_follower = Doc_Follower(
        user_id = user_id,
        doc_id = doc_id, 
        created_at = created_at
    )

    db.session.add(doc_follower)
    db.session.commit()

    return doc_follower

def get_followers_by_doc_id(doc_id):
    """Return a document's followers."""

    # used to be all followers
    # return Doc.query.get(doc_id).followers

    # narrow down to accepted followers
    # follows = Doc_Follower.query.filter(Doc_Follower.doc_id == doc_id,
    # Doc_Follower.accepted == True)

    # users = []

    # for follow in follows:
    #     users.append(follow.user_id)

    followers =  db.session.query(User).\
                    join(Doc_Follower, Doc_Follower.user_id == User.user_id).\
                    filter(Doc_Follower.doc_id == doc_id, Doc_Follower.accepted == True).all()

    return followers

def get_followed_docs_by_user_id(user_id):
    """Return all docs followed by a user."""

    # return User.query.get(user_id).followed_docs

    followed_docs = db.session.query(Doc).\
        join(Doc_Follower, Doc_Follower.doc_id == Doc.doc_id).\
        filter(Doc_Follower.user_id == user_id, Doc_Follower.accepted == True).all()

    return followed_docs

### INVITE CRUD OPERATIONS ###
def get_invites_by_user_id(user_id):
    """Return all of a user's article invites."""
    invites = []
    fdocs = Doc_Follower.query.filter(Doc_Follower.user_id == user_id,
    Doc_Follower.accepted == False)

    for fdoc in fdocs:
        fdoc_id = fdoc.doc_id
        doc = Doc.query.get(fdoc_id)
        inviter = User.query.get(doc.owner)
        title = doc.title

        invites.append({
            'invite_id' : fdoc.doc_follower_id,
            'inviter': f"{inviter.fname} {inviter.lname}",
            'title' : title,
            'doc_id': fdoc_id,
            'created_at': fdoc.created_at
        })

    return invites

def accept_invite_by_follow_id(follow_id):
    """Accept an invite"""
    follow = Doc_Follower.query.get(follow_id)
    follow.accepted = True
    fdoc_id = follow.doc_id
    doc = Doc.query.get(fdoc_id)
    inviter = User.query.get(doc.owner)

    db.session.commit()

    print(f"{follow.accepted} ACCEPTED?")

    return inviter #for notification of acceptance

def decline_invite_by_follow_id(follow_id):
    """Decline an invite"""
    follow = Doc_Follower.query.get(follow_id)
    
    db.session.delete(follow)
    db.session.commit()


### AUTHOR CRUD OPERATIONS ###

def get_author_by_doc_id(doc_id):
    """Return a doc's authors"""

    return Doc.query.get(doc_id).authors

### IMAGE URL CRUD OPERATIONS ###

def get_image_url_by_doc_id(doc_id):
    """Return a doc's img urls"""

    return Doc.query.get(doc_id).img_urls


### NOTE CRUD OPERATIONS ###

def check_prev_note_color(user_id, doc_id):
    """Check for the color of a user's prev note for a doc."""

    note = Note.query.\
        filter(Note.user_id == user_id, Note.doc_id == doc_id).first()

    if note:
        return note.color
    else:
        return None


def create_note(user_id, doc_id, created_at, body, x_pos, y_pos, fname, lname):
    """Create a note."""
    # figure out x and y pos

    # tz = pytz.timezone('America/Los_Angeles')
    # created_at = datetime.now(tz)

    color_check = check_prev_note_color(user_id, doc_id)
    if color_check:
        color = color_check
    else:
        color = '#C2D6C4'

    note = Note(
        user_id = user_id,
        doc_id = doc_id, 
        created_at = created_at, 
        body = body,
        x_pos = x_pos,
        y_pos = y_pos,
        fname = fname,
        lname = lname,
        color = color
    )

    db.session.add(note)
    db.session.commit()

    return {'note': note, 'color': color}


def get_notes_by_doc_id(doc_id):
    """Get all notes belonging to a document."""

    # Doc.query.get(doc_id).notes (Which is more efficient?)

    return Note.query.filter(Note.doc_id == doc_id).all()


def update_note_pos(note_id, new_x, new_y):
    """Update note position."""

    note = Note.query.get(note_id)
    note.x_pos = new_x
    note.y_pos =  new_y

    db.session.commit()

    return note

def update_note_color(user_id, doc_id, color):
    """Update color for all of a user's notes in a doc."""

    db.session.query(Note).\
        filter(Note.user_id == user_id, Note.doc_id == doc_id).\
        update({Note.color: color}, synchronize_session=False)

    db.session.commit()


    


### LIKE CRUD OPERATIONS ###
def get_num_likes_by_note_id(note_id):
    """Get number of likes for a document"""

    return Like.query.filter(Like.note_id == note_id).count()


def get_if_user_likes_a_note(user_id, note_id):
    """Return a bool representing if a user has liked a certain note."""

    like = Like.query.\
        filter(Like.note_id == note_id, Like.user_id == user_id).first()

    return (like is not None)


def create_like(user_id, note_id):
    """Create a like for a note."""

    like = Like(
        user_id = user_id,
        note_id = note_id
    )

    db.session.add(like)
    db.session.commit()

    return like


def unlike(user_id, note_id):
    """Unlike a note."""

    like = Like.query.\
        filter(Like.note_id == note_id, Like.user_id == user_id).first()

    db.session.delete(like)
    db.session.commit()

    return 'Note unliked'


### USER PROFILE QUERIES ###
def get_total_num_likes(user_id):
    """Get the a user's total number of likes (cumulative across all their notes)."""
    
    total_likes = Like.query.filter(Like.note.has(user_id=user_id)).count()
    return total_likes


def get_most_liked_note(user_id):
    """Get a user's most-liked note."""

    most_liked_note_id = db.session.query(Like.note_id, func.count(Like.note_id)).\
        filter(Like.note.has(user_id=user_id)).\
        group_by(Like.note_id).\
        order_by(func.count(Like.note_id).desc()).first()

    note = None
    num_likes = None
    if most_liked_note_id:
        note = Note.query.get(most_liked_note_id[0])
        num_likes = most_liked_note_id[1]

    return note, num_likes


def get_most_followed_doc(user_id):
    """Get a user's doc with the most followers."""

    doc_info = db.session.query(Doc_Follower.doc_id, func.count(Doc_Follower.doc_id)).\
            filter(Doc_Follower.doc.has(owner=user_id)).\
            group_by(Doc_Follower.doc_id).\
            order_by(func.count(Doc_Follower.doc_id).desc()).first()

    doc = None
    followers = None
    if doc_info:
        doc = Doc.query.get(doc_info[0])
        followers = doc_info[1]

    return doc, followers


### FRIEND OPERATIONS ###
def create_friend_relationship_type():
    friend_relationship = Relationship_Type(
        relationship_type = 'friends'
    )

    db.session.add(friend_relationship)
    db.session.commit()

    return friend_relationship

def check_if_friends(user_1_id, user_2_id):
    users = [user_1_id, user_2_id]
    friends = User_Relationship.query.\
                filter(User_Relationship.user_1_id.in_(users),
                    User_Relationship.user_2_id.in_(users), 
                    User_Relationship.relationship_type_id == 1).first()

    return True if (friends and user_1_id != user_2_id) else False


def add_friend(user_1_id, user_2_id):
    tz = pytz.timezone('America/Los_Angeles')
    created_at = datetime.now(tz)

    friendship = User_Relationship(
        user_1_id = user_1_id,
        user_2_id = user_2_id,
        relationship_type_id = 1,
        created_at = created_at
    )

    db.session.add(friendship)
    db.session.commit()

    return friendship


### SEARCH OPERATIONS ###
def binary_similarity_score(pattern, string):
    """Return 1 or 0 if pattern is and is not in a string, respectively."""
    
    l = len(pattern)
    s = len(string)

    score = 0

    for i in range(s - l + 1):
        if string[i:i+l] == pattern:
            score = 1
            break

    return score


def frequency_similarity_score(pattern, string):
    """Return a similarity score that is the percentage of occurrences of
        a pattern in a string."""
    
    l = len(pattern)
    s = len(string)

    count = 0

    for i in range(s - l + 1):
        if string[i:i+l] == pattern:
            count += 1
    
    return count * l / s

    
def calculate_similarity_score(search_term, doc):
    """Provide a similarity score (0 - 10) for a search term and a string."""
    doc_id = doc.doc_id
    title = doc.title
    body = doc.body

    authors = doc.authors
    print(doc.authors)
    author_list = []
    for author in authors:
        author_list.append(author.name)
    print(" ".join(author_list))

    score = sum([
        0.3 * binary_similarity_score(search_term, " ".join(author_list)), 
        0.5 * binary_similarity_score(search_term, title), 
        100 * frequency_similarity_score(search_term, body)
    ])

    return (doc_id, score, title)


def get_doc_matches(search_term, user_id):
    """Search for docs with the highest similarity score to 
       the given search term."""

    docs = Doc.query.filter(Doc.owner == user_id).all()

    scores = []

    for doc in docs:
        scores.append(calculate_similarity_score(search_term, doc))

    return sorted(scores, key=lambda score: score[1], reverse=True) 
    
            




















