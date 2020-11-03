"""CRUD operations."""

from model import db, User, connect_to_db

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


