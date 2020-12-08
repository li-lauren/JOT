# JOT

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

### Search Feature

A search and autocomplete feature was built from scratch and optimized via
the Knuth-Morris-Pratt string searching algorithm.

![search-gif](https://github.com/li-lauren/JOT/blob/master/gifs/jot_search.gif)