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
trie = server.email_trie

user_1 = crud.create_user('John', 'Smith', 'john@example.com', 'test', '', trie)
user_2 = crud.create_user('Marie', 'Brener', 'marie@example.com', 'test', '', trie)
user_3 = crud.create_user('Lauren', 'Li', 'lauren@example.com', 'test', '', trie)
user_4 = crud.create_user('John Paul', 'Roberts', 'johnpaul@example.com', 'test', '', trie)
user_5 = crud.create_user('Jonas', 'Hill', 'jonas@example.com', 'test', '', trie)
user_6 = crud.create_user('Jonathan', 'Lee', 'jonathan@example.com', 'test', '', trie)
user_7 = crud.create_user('Jon', 'Nakayama', 'jon@example.com', 'test', '', trie)
user_8 = crud.create_user('Jose', 'Gonzales', 'jose@example.com', 'test', '', trie)
user_9 = crud.create_user('Jacob', 'Smith', 'jacob@example.com', 'test', '', trie)
user_10 = crud.create_user('Johannes', 'Muller', 'johannes@example.com', 'test', '', trie)
user_11 = crud.create_user('Jason', 'Jones', 'jason@example.com', 'test', '', trie)
user_12 = crud.create_user('Janice', 'Joplin', 'janice@example.com', 'test', '', trie)




article_urls_1 = [
    'https://www.archpaper.com/2020/09/public-opinion-has-softened-on-brutalism-isnt-enough-to-stay-the-wrecking-ball/',
    'https://www.theatlantic.com/politics/archive/2020/05/is-flying-safe-coronavirus/611335/',
    'https://www.popularmechanics.com/technology/infrastructure/a34313925/whale-tail-train-derailment/',
    'https://abduzeedo.com/editorial-design-new-brutalism-controversial-concrete',
    'https://www.artnews.com/art-news/market/david-ross-hockney-royal-opera-house-1234577007/',
    'https://www.theatlantic.com/magazine/archive/2020/12/the-last-children-of-down-syndrome/616928/',
    'https://www.caltech.edu/campus-life-events/master-calendar/watson-lecture-2020-12',
    'https://www.caltech.edu/about/news/caltech-awards-10000th-phd-degree-during-october-conferral-students-impacted-pandemic',
    'https://www.caltech.edu/about/news/hundreds-copies-newtons-emprincipiaem-found-new-census',
    'https://www.caltech.edu/about/news/neuroscientist-viviana-gradinaru-receives-young-investigator-award',
    'https://www.caltech.edu/about/news/how-stem-cells-choose-their-careers',
    'https://www.theverge.com/2020/10/24/21531089/netflix-rebecca-review-hitchcock-disney-remake',
    'https://www.newyorker.com/culture/the-front-row/on-the-rocks-reviewed-sofia-coppolas-self-questioning-film-of-a-fathers-destructive-dazzle',
    'https://www.newyorker.com/culture/the-front-row/highlights-from-week-one-of-the-new-york-film-festival',
    'https://news.mit.edu/2020/neural-network-uncertainty-1120',
    'https://news.mit.edu/2020/erik-demaine-mit-bose-award-excellence-teaching-1120'
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

# CREATE FRIEND RELATIONSHIP TYPE
crud.create_relationship_type('pending_friends')
crud.create_relationship_type('friends')

# John and Marie are friends
req = crud.create_friend_req(1,2)
crud.add_friend(req.user_relationship_id)

# Some article following
follow = crud.create_doc_follower(1,4, "Thought you'd like this!")
crud.accept_invite_by_follow_id(follow.doc_follower_id)

follow2 = crud.create_doc_follower(2,1, "Reminded me of what we were talking about last week...")
crud.accept_invite_by_follow_id(follow2.doc_follower_id)




