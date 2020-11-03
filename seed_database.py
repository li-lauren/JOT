"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system('dropdb jot')
os.system('createdb jot')

model.connect_to_db(server.app)
model.db.create_all()


users_in_db = []
for n in range(10):
    fname = str(n)
    lname = str(n)
    email = f'user{n}@test.com'
    pw = 'test'
    user = crud.create_user(fname, lname, email, pw)
    users_in_db.append(user)


