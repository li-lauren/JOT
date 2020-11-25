const UserProfile = () => {
    // const [topDoc, setTopDoc] = useState(null)
    // const [topDocFollowers, setTopDocFollowers] = useState(null)
    
    // const [topNote, setTopNote] = useState(null)
    // const [topNoteLikes, setTopNoteLikes] = useState(null)
    // const [totalLikes, setTotalLikes] = useState(null)

    // const [numFriends, setNumFriends] = useState(null)
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
    const topDoc = data.topDoc
    const topDocFollowers = data.topDocFollowers

    // console.log(topDoc.title)
    
    // useEffect(() => {
    //     fetch(`/user/${user_id}`)
    //     .then(res => res.json())
    //     .then(stats => {
    //         setTotalLikes(stats.totalLikes)
    //         setTopNote(stats.topNote)
    //         setTopNoteLikes(stats.topNoteLikes)
    //         setTopDoc(stats.topDoc)
    //         setTopDocFollowers(stats.topDocFollowers)
    //     })
    // }, [])

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
        <div>
            <h4>User Profile</h4>
            <h1>{user.fname} {user.lname}</h1>
            <h5>{user.email}</h5>
            {friends ? 
                (friends == 'Friends'? 
                    <Button>
                        Friends <i className="far fa-check-circle"></i>
                    </Button> : 
                    <Button>Pending</Button>) :
                <Button onClick={ReqFriend}>Send Friend Request</Button> 
            }
            
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

            <div>
                <span>{topDoc ? topDoc.title : 'No docs yet'}</span>
                <br/>
                <span>{topDoc ? `${topDocFollowers} followers` : ''}</span>
                <br/>
                <span>Top Article</span>
            </div>

        </div>
    )
}