const MyProfile = ({setLoggedIn}) => {
    const [topDoc, setTopDoc] = useState(null)
    const [topDocFollowers, setTopDocFollowers] = useState(null)
    
    const [topNote, setTopNote] = useState(null)
    const [topNoteLikes, setTopNoteLikes] = useState(null)
    const [totalLikes, setTotalLikes] = useState(null)

    const [numFriends, setNumFriends] = useState(null)

    const [showSearch, setShowSearch] = useState(false)
   
    const user_id = localStorage.getItem('user_id')
    const fname = localStorage.getItem('fname')
    const lname = localStorage.getItem('lname')
    const email = localStorage.getItem('email')
    const socket = useContext(SocketContext)

    const logout = () => {
        setLoggedIn(false)
        fetch('/logout')
        .then(() => {
            console.log('Disconnecting...')
            if (socket) {
                socket.disconnect()
            }
            localStorage.clear()    
        })    
    }

    useEffect(() => {
        getMyProfile()
    }, [])

    const getMyProfile = () => {
        
        console.log('Get profile')

        fetch(`/user/${user_id}`)
        .then(res => res.json())
        .then(stats => {
            setTotalLikes(stats.totalLikes)
            setTopNote(stats.topNote)
            setTopNoteLikes(stats.topNoteLikes)
            setTopDoc(stats.topDoc)
            setTopDocFollowers(stats.topDocFollowers)
        })
    }


    return(
        <Container>
            <Row>
                <Col >
                    <h4 id="profile-header">Profile / {fname}</h4>
                </Col>
                <Col xs={9}>
                    <Row>
                        <Col>
                            <h1>{fname} {lname}</h1>
                            <h5 className="email-h">{email}</h5>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            {
                                showSearch ? 
                                    <div>
                                        <Search setShowSearch={setShowSearch} />
                                        <span 
                                            className="material-icons md-36"
                                            onClick={() => setShowSearch(false)}
                                        >
                                            search_off
                                        </span>
                                    </div> : 
                                    <span  
                                        className="material-icons md-36"
                                        onClick={() => setShowSearch(true)}
                                    >
                                        search
                                    </span>

                            }
                            
                        </Col>

                    </Row>
                    

                    
                    <FriendReqList />
                    
                    <div>
                        <span>{totalLikes}</span>
                        <br/>
                        <span>All-time Likes</span>
                    </div>

                    <div>
                        <span>{topNote ? topNote.body : 'No jots yet'}</span>
                        <br/>
                        <span>{topNote ? `${topNoteLikes} likes` : ''}</span>
                        <br/>
                        <span>Top Jot</span>
                    </div>

                    <div className="top-stat">
                        <span>{topDoc ? topDoc.title : 'No docs yet'}</span>
                        <br/>
                        <span>{topDoc ? `${topDocFollowers} followers` : ''}</span>
                        <br/>
                        <span>Top Article</span>
                    </div>
                </Col>
                <Col xs={1}>
                    <a href="" onClick={logout}>Logout</a>
                </Col>
            </Row>
           
            

        </Container>
    )
}