# JOT

## Short Demo Video
https://youtu.be/yNFN-Z25rWE

## Tech Stack
React, Flask, Socket.IO, Flask-SocketIO, PostgreSQL, SQLAlchemy, D3.js

## External APIs
Python Newspaper (Web Scraping)

## Feature Summary

Jot is a SPWA which allows users to collaboratively share, read, and comment on articles. Web socket incorporation allows for a seamless cross-browser user experience where threaded comments and other notifications are updated in real-time. Furthermore, with scaleability in mind, two autocomplete searches (one for articles and another for users) were written from scratch through implementations of the Knuth-Morris-Pratt string searching algorithm and a trie data structure, respectively. To enhance the overall social experience, a real-time friending feature is also available. Finally, users have the ability to tag articles and subsequently explore them via a zoomable circle packing visualization implemented using D3.js.

![intro-gif-1](https://github.com/li-lauren/JOT/blob/master/gifs/jot_intro_1.gif)

### Article Overview

Users can upload articles which are scraped using Python Newspaper.  Additional article-specific features include inviting other users, tagging articles, and 
adding comments (jots).

![intro-gif-2](https://github.com/li-lauren/JOT/blob/master/gifs/jot_intro_2.gif)

### Real-Time, Threaded Commenting

Draggable comments (jots) have positions that are sychronized in real-time across browsers. Users can also reply to specific jots, and replies are recursively nested within their parent jots. For aesthetics and to help distinguish  from one another, 
users can also customize the color of their comments.  

![jot-gif](https://github.com/li-lauren/JOT/blob/master/gifs/jot_jots.gif)

### Search Feature

A search and autocomplete feature was built from scratch and optimized via
the Knuth-Morris-Pratt string searching algorithm.

![search-gif](https://github.com/li-lauren/JOT/blob/master/gifs/jot_search.gif)

### User Profile

Each user has their own profile highlighting some personalized stats (top comment, most followed article, etc.).  From this page, they can also search for and 
select from suggested users (user emails were stored in a trie data structure for 
quick searching) to view other profiles and send friend requests in real-time. 

![user-profile-gif](https://github.com/li-lauren/JOT/blob/master/gifs/jot_user_profile.gif)