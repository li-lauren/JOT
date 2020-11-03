"""CRUD operations."""

from model import (db, connect_to_db, User, Doc, Author, Doc_Author, Img_Url,
                    Tag, Doc_Tag, Doc_Follower, Note, Like, Relationship_Type,
                    User_Relationship)

if __name__ == '__main__':
    from server import app
    connect_to_db(app)

def create_user(fname, lname, email, pw):
    """Create and return a new user."""

    user = User(
        fname = fname,
        lname = lname,
        email = email,
        pw = pw
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
def create_doc(url, title, doc_date, body, owner):
    #get created_at
    return


def create_author(fname='', lname=''):
    """Create an author."""
    
    author = Author(
        fname = fname,
        lname = lname
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
    """Return all docs belonging to user_id"""

    return Doc.query.filter(Doc.owner == user_id).all()


### ADD DOC_FOLLOWER AT SOME POINT ###

### NOTE CRUD OPERATIONS ###






