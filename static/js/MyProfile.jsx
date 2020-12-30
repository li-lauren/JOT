const MyProfile = ({setLoggedIn}) => {
    const [topDoc, setTopDoc] = useState(null)
    const [topDocFollowers, setTopDocFollowers] = useState(null)
    const [topImg, setTopImg] = useState(null)
    
    const [topNote, setTopNote] = useState(null)
    const [topNoteLikes, setTopNoteLikes] = useState(null)
    const [totalLikes, setTotalLikes] = useState(null)
    const [topNoteDoc, setTopNoteDoc] = useState(null)
    const [topNoteImg, setTopNoteImg] = useState(null)

    const [numFriends, setNumFriends] = useState(null)

    const [showSearch, setShowSearch] = useState(false)
   
    const user_id = localStorage.getItem('user_id')
    const fname = localStorage.getItem('fname')
    const lname = localStorage.getItem('lname')
    const email = localStorage.getItem('email')
    const socket = useContext(SocketContext)

    const logout = () => {
        setLoggedIn(false)
        localStorage.clear()   
        fetch('/logout')
        .then(() => {
            console.log('Disconnecting...')
            if (socket) {
                socket.disconnect()
            } 
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
            setTopNoteDoc(stats.topNoteDoc)
            setTopNoteImg(stats.topNoteImg)
            setTopDoc(stats.topDoc)
            setTopDocFollowers(stats.topDocFollowers)
            setTopImg(stats.topImg)
        })
    }


    return(
        <div>
            <Navbar />
            <Container style={{'margin-top': '-50px'}}>
                
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
                                
                            </Col>

                        </Row>
                        

                        
                        <FriendReqList />

                        <Row style={{"margin-top": "60px"}}>
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
                    <Col xs={1} className="text-right" style={{"margin-right": "-50px"}}>
                        <a href="" onClick={logout}>Logout</a>
                    </Col>
                </Row>
            
                

            </Container>
        </div>
    )
}