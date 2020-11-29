tag_tree = [{
    "name": "All",
    "children": [
        {
            "name": "Science", 
            "children": [
                {
                    "name": "Science",
                    "children": [
                        {
                            "name": "Astronomy", 
                            "children": [

                            ]
                        },
                        {
                            "name": "History", 
                            "children": [
                                
                            ]
                        },
                        {
                            "name": "Math",
                            "children": [
                                
                            ]
                        }, 
                        {
                            "name": "Biology",
                            "children": [
                            
                            ]
                        }
                    ]
                },
                {
                    "name": "Technology",
                    "children": [
                        {
                            "name": "Computer Science",
                            "children": [
                                
                            ]
                        },
                        {
                            "name": "Engineering", 
                            "children": [
                                
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "Health", 
            "children": [
                {
                    "name": "Medicine",
                    "children": [

                    ]
                }, 
                {
                    "name": "Exercise",
                    "children": [

                    ] 
                },
                {
                    "name": "Wellness",
                    "children": [

                    ]
                }
            ]
        },
        {
            "name": "Arts", 
            "children": [
                {
                    "name": "Visual Arts", 
                    "children": [
                        {
                            "name": "Design", 
                            "children": [
                                
                            ]
                        },
                        {
                            "name": "Fine Arts", 
                            "children": [
                                
                            ]
                        },
                        {
                            "name": "Architecture", 
                            "children": [
                                
                            ]
                        }
                    ]
                }, 
                {
                    "name": "Music & Performance Arts", 
                    "children": [
                        {
                            "name": "Music",
                            "children": [

                            ]
                        }, 
                        {
                            "name": "Dance",
                            "children": [

                            ]
                        },
                        {
                            "name": "Theater",
                            "children": [

                            ]
                        }, 
                        {
                            "name": "Comedy",
                            "children": [

                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name": "Books", 
            "children": [

            ]
        },
        {
            "name": "Entertainment", 
            "children": [
                {
                    "name": "Film",
                    "children": [

                    ]
                }, 
                {
                    "name": "TV", 
                    "children": [

                    ]
                }, 
                {
                    "name": "Events",
                    "children": [

                    ]
                }
            ]
        },
        {
            "name": "Food", 
            "children": [

            ]
        }, 
        {
            "name": "Politics", 
            "children": [

            ]
        },
        {
            "name": "Business", 
            "children": [

            ]
        },
        {
            "name": "Sports", 
            "children": [

            ]
        }, 
        {
            "name": "Other", 
            "children": [

            ]
        }
    ]
}]



def get_leaves(tag_tree):
    if not tag_tree:
        return []

    leaf_tag = []
    
    for obj in tag_tree:
        if not obj.get("children"):
            leaf_tag.extend([obj.get("name")])
        else:
            leaf_tag.extend(get_leaves(obj.get("children")))
    
    return leaf_tag 


print(get_leaves(tag_tree))

    