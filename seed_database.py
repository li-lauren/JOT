"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime
from newspaper import Article

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
    img = ''
    user = crud.create_user(fname, lname, email, pw, img)
    users_in_db.append(user)


article_urls = [
    'https://www.archpaper.com/2020/09/public-opinion-has-softened-on-brutalism-isnt-enough-to-stay-the-wrecking-ball/',
    'https://www.theatlantic.com/politics/archive/2020/05/is-flying-safe-coronavirus/611335/',
    'https://www.popularmechanics.com/technology/infrastructure/a34313925/whale-tail-train-derailment/'
]


docs_in_db = []
img_urls_in_db = []
authors_in_db = []
for url in article_urls: 
    article = Article(url)
    article.download()
    article.parse()

    title = article.title
    publish_date = article.publish_date
    body = article.text
    owner = 4
    doc = crud.create_doc(url, title, publish_date, body, owner)
    docs_in_db.append(doc)

    img_url = crud.create_img_url(doc.doc_id, article.top_image)
    img_urls_in_db.append(img_url)

    authors = article.authors
    for author in authors:
        a = crud.create_author(author)
        authors_in_db.append(a)
        doc_author = crud.create_doc_author(doc.doc_id, a.author_id)

# Add in some notes
crud.create_note(4, 3, 'Old note from user 3')
crud.create_note(3, 3, 'Old note from user 2')

