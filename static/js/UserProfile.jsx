const UserProfile = () => {
    // const [topDoc, setTopDoc] = useState(null)
    // const [topDocFollowers, setTopDocFollowers] = useState(null)
    
    // const [topNote, setTopNote] = useState(null)
    // const [topNoteLikes, setTopNoteLikes] = useState(null)
    // const [totalLikes, setTotalLikes] = useState(null)

    // const [numFriends, setNumFriends] = useState(null)
    const [friends, setFriends] = useState(false)

    const userId = localStorage.getItem('user_id')
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
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('friend_added', () => {
                setFriends(true)
            })
        }
    }, [])

    const getFriendStatus = () => {
        fetch(`/friend/${user.user_id}`)
        .then(res => res.json())
        .then(data => setFriends(data.isFriends))

    }

    const addFriend = () => {
        console.log('adding friend...')
        socket.emit('add_friend', {'id_to_friend': user.user_id, 'user_id': userId})
    }

    return(
        <div>
            <h4>User Profile</h4>
            <h1>{user.fname} {user.lname}</h1>
            <h5>{user.email}</h5>
            {friends ? 
                <Button>Unfriend</Button> :
                <Button onClick={addFriend}>Add Friend</Button> 
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