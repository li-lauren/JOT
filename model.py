from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, 
                        autoincrement=True,
                        primary_key=True)

    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    pw = db.Column(db.String(30), nullable=False)
    img = db.Column(db.String)

    notes = db.relationship("Note")
    likes = db.relationship("Like")

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'

class Doc(db.Model):
    """A document/article."""

    __tablename__ = "docs"

    doc_id = db.Column(db.Integer, 
                        autoincrement=True,
                        primary_key=True)

    url = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    doc_date = db.Column(db.DateTime)
    body = db.Column(db.Text)
    owner = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    created_at = db.Column(db.DateTime) #date added to Jot

    authors = db.relationship("Author", 
                              secondary="doc_authors", 
                              backref="docs")

    img_urls = db.relationship("Img_Url", backref="doc")

    tags = db.relationship("Tag", 
                            secondary="doc_tags", 
                            backref="docs")

    followers = db.relationship("User", 
                                secondary="doc_followers", 
                                backref="followed_docs")

    notes = db.relationship("Note")

    def __repr__(self):
        return f'<Doc doc_id={self.doc_id} title={self.title}>'


class Author(db.Model):
    """An author"""

    __tablename__ = "authors"

    author_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))

    def __repr__(self):
        return f'<Author author_id={self.author_id} fname={self.fname} lname={self.lname}>'
   

class Doc_Author(db.Model):
    """A document's author"""

    __tablename__ = "doc_authors"

    doc_author_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))
    author_id = db.Column(db.Integer, db.ForeignKey('authors.author_id'))


class Img_Url(db.Model):
    """A document's image url."""

    __tablename__ = "img_urls"

    img_url_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))
    url = db.Column(db.String)

    def __repr__(self):
        return f'<Img_URL image_url_id={self.image_url_id} doc_id={self.doc_id}>'


class Tag(db.Model):
    """A tag"""

    __tablename__ = "tags"

    tag_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    tag = db.Column(db.String)

    def __repr__(self):
        return f'<Tag tag_id={self.tag_id} tag={self.tag}>'
   

class Doc_Tag(db.Model):
    """A document's tag"""

    __tablename__ = "doc_tags"

    doc_tag_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.tag_id'))


class Doc_Follower(db.Model):
    """A document's follower."""

    __tablename__ = "doc_followers"

    doc_follower_id = db.Column(db.Integer, 
                                autoincrement=True, 
                                primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))
    created_at = db.Column(db.DateTime)

    def __repr__(self):
        return (f'<Doc_Follower doc_follower_id={self.doc_follower_id} 
                 user_id={self.user_id} 
                 doc_id={self.doc_id}>')


class Note(db.Model):
    """A note."""

    __tablename__ = "notes"

    note_id = db.Column(db.Integer, 
                        autoincrement=True, 
                        primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))

    created_at = db.Column(db.DateTime)
    body = db.Column(db.Text)
    x_pos = db.Column(db.Float)
    y_pos = db.Column(db.Float)

    doc = db.relationship("Doc")
    user = db.relationship("User")

    likes = db.relationship("Like")

    def __repr__(self):
        return f'<Note note_id={self.note_id} x_pos={self.x_pos} y_pos={self.y_pos}>'


class Like(db.Model):
    """A like."""

    __tablename__ = "likes"

    like_id = db.Column(db.Integer, 
                        autoincrement=True, 
                        primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    note_id = db.Column(db.Integer, db.ForeignKey('notes.note_id'))

    user = db.relationship("User")
    note = db.relationship("Note")

    def __repr__(self):
        return f'<Like like_id={self.like_id} user_id={self.user_id} note_id={self.note_id}>' 


class Relationship_Type(db.Model):
    """A type of user relationship"""

    relationship_type_id = db.Column(db.Integer, 
                                     autoincrement=True, 
                                     primary_key=True)
    relationship_type = db.Column(db.String)

    def __repr__(self):
        return (f'<Relationship Type 
                   relationship_type_id={self.relationship_type_id} 
                   relationship_type={self.relationship_type}>')



class User_Relationship(db.Model):
    """A user relationship (friends, etc.)"""

    user_relationship_id = db.Column(db.Integer, 
                                     autoincrement=True, 
                                     primary_key=True)

    user_1_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    user_2_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    relationship_type_id = db.Column(db.Integer, 
                                 db.ForeignKey('relationship_types.relationship_type_id'))

    created_at = db.Column(db.DateTime)

    def __repr__(self):
        return (f'<User Relationship
                   user_relationship_id={self.user_relationship_id} 
                   user_1_id={self.user_1_id} 
                   user_2_id={self.user_2_id}>')



   

def connect_to_db(flask_app, db_uri='postgresql:///jot', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)