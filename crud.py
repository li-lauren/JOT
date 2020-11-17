"""CRUD operations."""

from datetime import datetime
import pytz

from model import (db, connect_to_db, User, Doc, Author, Doc_Author, Img_Url,
                    Tag, Doc_Tag, Doc_Follower, Note, Like, Relationship_Type,
                    User_Relationship)

if __name__ == '__main__':
    from server import app
    connect_to_db(app)


### USER CRUD OPS ###

def create_user(fname, lname, email, pw, img):
    """Create and return a new user."""

    user = User(
        fname = fname,
        lname = lname,
        email = email,
        pw = pw,
        img = img
    )

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

    return Doc.query.get(doc_id).followers

def get_followed_docs_by_user_id(user_id):
    """Return all docs followed by a user."""

    return User.query.get(user_id).followed_docs

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

    db.session.commit()

    return follow


### AUTHOR CRUD OPERATIONS ###

def get_author_by_doc_id(doc_id):
    """Return a doc's authors"""

    return Doc.query.get(doc_id).authors

### IMAGE URL CRUD OPERATIONS ###

def get_image_url_by_doc_id(doc_id):
    """Return a doc's img urls"""

    return Doc.query.get(doc_id).img_urls


### NOTE CRUD OPERATIONS ###

def create_note(user_id, doc_id, created_at, body, x_pos, y_pos, fname, lname):
    """Create a note."""
    # figure out x and y pos

    # tz = pytz.timezone('America/Los_Angeles')
    # created_at = datetime.now(tz)

    note = Note(
        user_id = user_id,
        doc_id = doc_id, 
        created_at = created_at, 
        body = body,
        x_pos = x_pos,
        y_pos = y_pos,
        fname = fname,
        lname = lname
    )

    db.session.add(note)
    db.session.commit()

    return note


def get_notes_by_doc_id(doc_id):
    """Get all notes belonging to a document."""

    # Doc.query.get(doc_id).notes (Which is more efficient?)

    return Note.query.filter(Note.doc_id == doc_id).all()


def update_note_pos(note_id, new_x, new_y):

    note = Note.query.get(note_id)
    note.x_pos = new_x
    note.y_pos =  new_y

    db.session.commit()

    return note


### LIKE CRUD OPERATIONS ###
def get_num_likes_by_note_id(note_id):
    """Get number of likes for a document"""

    return Like.query.filter(Like.note_id == note_id).count()









