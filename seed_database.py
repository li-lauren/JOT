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


# users_in_db = []
# for n in range(10):
#     fname = str(n)
#     lname = str(n)
#     email = f'user{n}@test.com'
#     pw = 'test'
#     img = ''
#     user = crud.create_user(fname, lname, email, pw, img)
#     users_in_db.append(user)

user_1 = crud.create_user('John', 'Smith', 'john@example.com', 'test', '')
user_2 = crud.create_user('Marie', 'Brener', 'marie@example.com', 'test', '')
user_3 = crud.create_user('Lauren', 'Li', 'lauren@example.com', 'test', '')

article_urls_1 = [
    'https://www.archpaper.com/2020/09/public-opinion-has-softened-on-brutalism-isnt-enough-to-stay-the-wrecking-ball/',
    'https://www.theatlantic.com/politics/archive/2020/05/is-flying-safe-coronavirus/611335/',
    'https://www.popularmechanics.com/technology/infrastructure/a34313925/whale-tail-train-derailment/'
]


docs_in_db = []
img_urls_in_db = []
authors_in_db = []
for url in article_urls_1: 
    article = Article(url, keep_article_html=True)
    article.download()
    article.parse()

    title = article.title
    publish_date = article.publish_date
    body = str(article.article_html)
    owner = 1
    
    doc = crud.create_doc(url, title, publish_date, body, owner)
    docs_in_db.append(doc)

    img_url = crud.create_img_url(doc.doc_id, article.top_image)
    img_urls_in_db.append(img_url)

    authors = article.authors
    for author in authors:
        a = crud.create_author(author)
        authors_in_db.append(a)
        doc_author = crud.create_doc_author(doc.doc_id, a.author_id)

article_urls_2 = [
    'https://www.vox.com/culture/21534638/the-mandalorian-disney-plus-explained-do-i-need-to-watch-star-wars-baby-yoda',
    'https://www.vox.com/covid-19-coronavirus-economy-recession-stock-market/2020/5/6/21248069/stock-market-economy-federal-reserve-jerome-powell'
]

for url in article_urls_2: 
    article = Article(url, keep_article_html=True)
    article.download()
    article.parse()

    title = article.title
    publish_date = article.publish_date
    body = str(article.article_html)
    owner = 2
    
    doc = crud.create_doc(url, title, publish_date, body, owner)
    docs_in_db.append(doc)

    img_url = crud.create_img_url(doc.doc_id, article.top_image)
    img_urls_in_db.append(img_url)

    authors = article.authors
    for author in authors:
        a = crud.create_author(author)
        authors_in_db.append(a)
        doc_author = crud.create_doc_author(doc.doc_id, a.author_id)

