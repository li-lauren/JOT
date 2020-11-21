class Trie():
    """Trie data structure."""

    def __init__(self):
        self.isLeaf = False
        self.children = {}

    def insert(self, word):
        """Insert a word."""
        current = self

        for char in word:
            current = current.children.setdefault(char, Trie())

        current.isLeaf = True

    def in_trie(self, word):
        """Check if a word is in the trie."""
        current = self

        for char in word:
            current = current.children.get(char)

            if not current:
                return False

        return current.isLeaf


    def search(self, search_chars):
        """Get all words in the trie beginning with the given search characters"""
        current = self

        for char in search_chars:
            current = current.children.get(char)

            if not current:
                return []
        

        def search_matches(trie, phrase):
            suggestions = []

            if trie.isLeaf:
                suggestions = [phrase]

            # children is a dictionary: keys=characters, values=tries
            for char, child in trie.children.items():
                suggestions.extend(search_matches(child, f"{phrase}{char}"))

            return suggestions


        return search_matches(current, search_chars)

    

        