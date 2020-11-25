const MyProfile = () => {
    const [topDoc, setTopDoc] = useState(null)
    const [topDocFollowers, setTopDocFollowers] = useState(null)
    
    const [topNote, setTopNote] = useState(null)
    const [topNoteLikes, setTopNoteLikes] = useState(null)
    const [totalLikes, setTotalLikes] = useState(null)

    const [numFriends, setNumFriends] = useState(null)
   
    const user_id = localStorage.getItem('user_id')
    const fname = localStorage.getItem('fname')
    const lname = localStorage.getItem('lname')
    const email = localStorage.getItem('email')
    const socket = useContext(SocketContext)


    // const totalLikes = userInfo.totalLikes
    // const topNote = userInfo.topNote
    // const topNoteLikes = userInfo.topNoteLikes
    // const topDoc = userInfo.topDoc
    // const topDocFollowers = userInfo.topDocFollowers

    // console.log(topDoc.title)
    
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

    // useEffect(() => {
    //     if (socket) {
    //         socket.on('friend_added', () => {
    //             setFriends(true)
    //         })
    //     }
    // }, [])



    return(
        <div>
            <h4>Profile</h4>
            <h1>{fname} {lname}</h1>
            <h5>{email}</h5>

            <Search />
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