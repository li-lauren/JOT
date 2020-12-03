const UserProfile = () => {
    
    const [friends, setFriends] = useState(null)
    const [update, setUpdate] = useState(false)

    const userId = parseInt(localStorage.getItem('user_id'))
    const socket = useContext(SocketContext)
    const location = useLocation()
    const data = location.state.params
    
    const user = data.user

    const totalLikes = data.totalLikes
    const topNote = data.topNote
    const topNoteLikes = data.topNoteLikes
    const topNoteDoc = data.topNoteDoc
    const topNoteImg = data.topNoteImg
    const topDoc = data.topDoc
    const topDocFollowers = data.topDocFollowers
    const topImg = data.topImg

    useEffect(() => {
        getFriendStatus()
    }, [update])

    useEffect(() => {
        let isMounted = true;

        socket.on("friend_added", data => {
            console.log("friend req accepted")
            console.log(data.userIds)
            if (isMounted && data.userIds.includes(userId)) {
                console.log("friend req accepted")
                setUpdate(true)
            }
        })
        socket.on("req_denied", data => {
            console.log("friend req denied")
            console.log(data.userIds)
            if (isMounted && data.userIds.includes(userId)) {
                console.log('denied')
                setUpdate(true)
            }
        })

        return () => {isMounted = false}
    }, [])

    const getFriendStatus = () => {
        fetch(`/friend/${user.user_id}`)
        .then(res => res.json())
        .then(data => setFriends(data.isFriends))
        setUpdate(false)
    }

    const ReqFriend = () => {
        console.log('requesting friend...')
        socket.emit('req_friend', {'acceptor_id': user.user_id, 'inviter_id': userId})
        setUpdate(!update)
    }

    return(
        // <div>
        //     <h4>User Profile</h4>
        //     <h1>{user.fname} {user.lname}</h1>
        //     <h5>{user.email}</h5>
        //     {friends ? 
        //         (friends == 'Friends'? 
        //             <Button>
        //                 Friends <i className="far fa-check-circle"></i>
        //             </Button> : 
        //             <Button>Pending</Button>) :
        //         <Button onClick={ReqFriend}>Send Friend Request</Button> 
        //     }
            
        //     <div>
        //         <span>{totalLikes}</span>
        //         <br/>
        //         <span>All-time Likes</span>
        //     </div>

        //     <div>
        //         <span>{topNote ? topNote.body : 'No jots yet'}</span>
        //         <br/>
        //         <span>{topNote ? `${topNoteLikes} likes` : ''}</span>
        //         <br/>
        //         <span>Top Jot</span>
        //     </div>

        //     <div>
        //         <span>{topDoc ? topDoc.title : 'No docs yet'}</span>
        //         <br/>
        //         <span>{topDoc ? `${topDocFollowers} followers` : ''}</span>
        //         <br/>
        //         <span>Top Article</span>
        //     </div>

            <Container>
                <Row>
                    <Col >
                        <h4 id="profile-header">Profile / {user.fname}</h4>
                    </Col>
                    <Col xs={9}>
                        <Row>
                            <Col>
                                <h1>{user.fname} {user.lname}</h1>
                                <h5 className="email-h">{user.email}</h5>
                            </Col>
                            {/* <Col className="d-flex justify-content-end">
                                {
                                    showSearch ? 
                                        <div>
                                            <Search setShowSearch={setShowSearch} />
                                            <span 
                                                className="material-icons md-36 search-i"
                                                onClick={() => setShowSearch(false)}
                                            >
                                                search_off
                                            </span>
                                        </div> : 
                                        <span  
                                            className="material-icons md-36 search-i"
                                            onClick={() => setShowSearch(true)}
                                        >
                                            search
                                        </span>

                                }
                                
                            </Col> */}
                        </Row>
                        
                        <Row>
                            {friends ? 
                                (friends == 'Friends'? 
                                    <Button>
                                        Friends <i className="far fa-check-circle"></i>
                                    </Button> : 
                                    <Button>Pending</Button>) :
                                <Button onClick={ReqFriend}>Send Friend Request</Button> 
                            }
                        </Row>

                        <Row style={{"margin-top": "100px"}}>
                            <Col xs={4}>
                                <div className="num-likes-cont">
                                    <span className="num-likes">{totalLikes}</span>
                                    <br/>
                                    <span className="num-likes-f">All-time Likes</span>
                                </div>
                            </Col>
                            <Col xs={8} className="top-note-cont">
                                <div className="top-note-img-cropper">
                                    <img className="top-img" src={topNoteImg} alt="top_note_image"/>
                                </div>

                                <div className="top-note-overlay">
                                    <span className="top-note-h">Top Jot</span>
                                    <div className="top-note-body">
                                        <span className="top-note">
                                            {topNote ? 
                                                topNote.body : 
                                                'No jots yet'}
                                        </span>
                                        <br/>
                                    
                                        { topNote ? 
                                            <span className="stat">
                                                <span className="top-number">{topNoteLikes}</span> 
                                                { topNoteLikes == 1 ? ` LIKE` : ` LIKES`} 
                                            </span> : ''
                                        }
                                        
                                        <br/>  
                                    </div>
                                </div>
                                
                            </Col>
                        </Row>
                        
                        
                        <Row className="d-flex top-article-row">
                            <div className="image-cropper">
                                <img className="top-img" src={topImg} alt="top_image"/>
                            </div>
                            
                            <div className="article-overlay">
                                <span className="top-article-h">Top Article</span>
                                <div className="top-article">
                                    
                                    <div className="top-title">{topDoc ? topDoc.title : 'No docs yet'}</div>
                                
                                    <div className="stat">{topDoc ? 
                                        <span>
                                            <span className="top-number">{topDocFollowers}</span> 
                                            { topDocFollowers == 1 ? ` FOLLOWER` : ` FOLLOWERS`} 
                                        </span>
                                        : ''}
                                    </div>
                                    <br/>           
                                </div>

                            </div>
                            
                        </Row>
                        
                    </Col>
                    <Col xs={1}>
                        
                    </Col>
                </Row>
            </Container>
        // </div>
    )
}