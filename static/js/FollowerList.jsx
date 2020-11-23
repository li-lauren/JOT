const FollowerList = ({doc_id, socket}) => {
    const [followerAdded, setFollowerAdded] = React.useState(false)
    const [followerList, setFollowerList] = React.useState([])

    // console.log(`DOC ID: ${doc_id}`)
    useEffect(() => {
        getFollowers()
    }, [followerAdded, doc_id])

    const getFollowers = () => {
        fetch('/followers')
        .then(res => res.json())
        .then(data => {
            setFollowerList(data)
            // ("msg" in data) ? setFollowerList([]) : setFollowerList(data);
        })
    }

    useEffect(() => {
        let isMounted = true;
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('invite_accepted', data => {
                console.log('invite accepted in follower list')
                if (isMounted && data.inviter == localStorage.getItem('user_id')) {
                    setFollowerAdded(!followerAdded)
                }   
            })
        } 
        
        return () => { isMounted = false };
    }, [])

    return (
        <div>
            <h5>Following</h5>
            {followerList.length > 0 ? (followerList.map(follower => 
                <li key={follower.user_id}>
                    {follower.fname} {follower.lname}
                </li>)) : <p>None</p>}
            <br/>
            <AddFollower 
                followerAdded={followerAdded}
                setFollowerAdded={setFollowerAdded} 
                socket={socket}
                doc_id={doc_id}
            />
        </div>
    )
}
