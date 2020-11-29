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
    leaf_dict = {}
    
    for obj in tag_tree:
        if not obj.get("children"):
            leaf_tag.extend([obj.get("name")])
            leaf_dict[obj.get("name")] = obj.get("children")
        else:
            leaf_tag.extend(get_leaves(obj.get("children")))
    
    return leaf_tag 


def initialize_tag_tree():
    tree = [{
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

    return tree

# TODO: Write an algorithm for determining paths
tag_paths = {
    "Astronomy" : [0,0,0],
    "History" : [0,0,1], 
    "Math": [0,0,2], 
    "Biology": [0,0,3],
    "Computer Science": [0,1,0],
    "Engineering": [0,1,1],
    "Medicine": [1,0],
    "Exercise": [1,1],
    "Wellness": [1,2],
    "Design": [2,0,0], 
    "Fine Arts": [2,0,1],
    "Architecture": [2,0,2],
    "Music": [2,1,0],
    "Dance": [2,1,1], 
    "Theater": [2,1,2], 
    "Comedy": [2,1,3], 
    "Books": [3], 
    "Film": [4,0],
    "TV": [4,1], 
    "Events": [4,2],
    "Food": [5], 
    "Politics": [6],
    "Business": [7], 
    "Sports": [8], 
    "Other": [9]
}

    