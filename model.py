from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass

db = SQLAlchemy()

@dataclass
class User(db.Model):
    """A user."""
    user_id: int
    fname: str
    lname: str
    email: str
    pw: str
    img: str

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



@dataclass
class Doc(db.Model):
    """A document/article."""
    doc_id: int
    url: str
    title: str
    publish_date: datetime
    owner: int #user?
    created_at: datetime
    body: str
    # authors: Author
    # img_urls: Img_Url
    # tags: Tag
    # followers: User

    __tablename__ = "docs"

    doc_id = db.Column(db.Integer, 
                        autoincrement=True,
                        primary_key=True)

    url = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    publish_date = db.Column(db.DateTime)
    # body = db.Column(db.Text)
    body = db.Column(db.String)
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


@dataclass
class Author(db.Model):
    """An author"""
    author_id: int
    name: str

    __tablename__ = "authors"

    author_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(50))

    def __repr__(self):
        return f'<Author author_id={self.author_id} name={self.name}>'
   

@dataclass
class Doc_Author(db.Model):
    """A document's author"""
    doc_author_id: int
    doc_id: int
    author_id: int

    __tablename__ = "doc_authors"

    doc_author_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))
    author_id = db.Column(db.Integer, db.ForeignKey('authors.author_id'))


@dataclass
class Img_Url(db.Model):
    """A document's image url."""
    img_url_id: int
    doc_id: int
    url: str

    __tablename__ = "img_urls"

    img_url_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))
    url = db.Column(db.String)

    def __repr__(self):
        return f'<Img_URL image_url_id={self.image_url_id} doc_id={self.doc_id}>'


@dataclass
class Tag(db.Model):
    """A tag"""
    tag_id: int
    tag: str

    __tablename__ = "tags"

    tag_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    tag = db.Column(db.String)

    def __repr__(self):
        return f'<Tag tag_id={self.tag_id} tag={self.tag}>'
   

@dataclass
class Doc_Tag(db.Model):
    """A document's tag"""
    doc_tag_id: int
    doc_id: int
    tag_id: int

    __tablename__ = "doc_tags"

    doc_tag_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.tag_id'))


@dataclass
class Doc_Follower(db.Model):
    """A document's follower."""
    doc_follower_id: int
    user_id: int
    doc_id: int
    created_at: datetime
    accepted: bool

    __tablename__ = "doc_followers"

    doc_follower_id = db.Column(db.Integer, 
                                autoincrement=True, 
                                primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    doc_id = db.Column(db.Integer, db.ForeignKey('docs.doc_id'))
    accepted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime)

    def __repr__(self):
        return (f'<Doc_Follower doc_follower_id={self.doc_follower_id} '
                 f'user_id={self.user_id} '
                 f'doc_id={self.doc_id}>')

@dataclass
class Note(db.Model):
    """A note."""
    note_id: int
    user_id: int
    doc_id: int
    created_at: datetime
    body: str
    x_pos: float
    y_pos: float
    fname: str
    lname: str
    color: str

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
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    color = db.Column(db.String, default='#C2D6C4')

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

    __tablename__ = "relationship_types"

    relationship_type_id = db.Column(db.Integer, 
                                     autoincrement=True, 
                                     primary_key=True)
    relationship_type = db.Column(db.String)

    def __repr__(self):
        return (f'<Relationship Type ' 
                   f'relationship_type_id={self.relationship_type_id} ' 
                   f'relationship_type={self.relationship_type}>')



class User_Relationship(db.Model):
    """A user relationship (friends, etc.)"""

    __tablename__ = "user_relationships"

    user_relationship_id = db.Column(db.Integer, 
                                     autoincrement=True, 
                                     primary_key=True)

    user_1_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    user_2_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    relationship_type_id = db.Column(db.Integer, 
                                 db.ForeignKey('relationship_types.relationship_type_id'))

    created_at = db.Column(db.DateTime)

    def __repr__(self):
        return (f'<User Relationship '
                   f'user_relationship_id={self.user_relationship_id} ' 
                   f'user_1_id={self.user_1_id} '
                   f'user_2_id={self.user_2_id}>')



   

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