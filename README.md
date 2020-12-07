###JOT

Jot is a SPWA which allows users to collaboratively share, read, and comment on articles. Web socket incorporation allows for a seamless cross-browser user experience where threaded comments and other notifications are updated in real-time. Furthermore, with scaleability in mind, two autocomplete searches (one for articles and another for users) were written from scratch through implementations of the Knuth-Morris-Pratt string searching algorithm and a trie data structure, respectively. To enhance the overall social experience, a real-time friending feature is also available. Finally, users have the ability to tag articles and subsequently explore them via a zoomable circle packing visualization implemented using D3.js.