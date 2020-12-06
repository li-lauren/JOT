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

    const unFriend = () => {
        console.log('unfriending')
        socket.emit('unfriend', {'acceptor_id': user.user_id, 'inviter_id': userId})
        setUpdate(!update)
    }

    return(
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
                    </Row>
                    
                    <Row>
                        {friends ? 
                            (friends == 'Friends'? 
                                <Button 
                                    className="friend-status"
                                    variant="outline-light"
                                    onClick={unFriend}
                                >
                                    Friends <i className="far fa-check-circle"></i>
                                </Button> : 
                                <Button 
                                    className="friend-status"
                                    variant="outline-light"
                                >
                                    Pending
                                </Button>) :
                                <Button 
                                    onClick={ReqFriend}
                                    className="friend-status"
                                    variant="outline-light"
                                >
                                    Send Friend Request
                                </Button> 
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
                <Col xs={1}></Col>
            </Row>
        </Container>
    )
}