const UserProfile = () => {
    // const [topDoc, setTopDoc] = useState(null)
    // const [topDocFollowers, setTopDocFollowers] = useState(null)
    
    // const [topNote, setTopNote] = useState(null)
    // const [topNoteLikes, setTopNoteLikes] = useState(null)
    // const [totalLikes, setTotalLikes] = useState(null)

    // const [numFriends, setNumFriends] = useState(null)
    // const [friends, setFriends] = useState(null)

    //const user_id = localStorage.getItem('user_id')
    const location = useLocation()
    const data = location.state.params
    
    
    const fname = data.fname
    const lname = data.lname
    const email = data.email

    const totalLikes = data.totalLikes
    const topNote = data.topNote
    const topNoteLikes = data.topNoteLikes
    const topDoc = data.topDoc
    const topDocFollowers = data.topDocFollowers

    console.log(topDoc.title)
    
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

    return(
        <div>
            <h4>User Profile</h4>
            <h1>{fname} {lname}</h1>
            <h5>{email}</h5>
            
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