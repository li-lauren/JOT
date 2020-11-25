const FriendReqList = () => {
    const [update, setUpdate] = useState(false)
    const [reqList, setReqList] = useState(null)
    const [friendList, setFriendList] = useState(null)
    const [pendingList, setPendingList] = useState(null)
    const socket = useContext(SocketContext)
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        getReqs()
        getFriends()
    }, [update])

    const getReqs = () => {
        fetch('/requests')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setReqList(data)
        })
    }

    const getFriends = () => {
        fetch('/friends')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setFriendList(data)
            setUpdate(false)
        })
    }

    const getPendingFriends = () => {
        fetch('/requests/pending')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPendingList(data)
        })
    }

    useEffect(() => {
        let isMounted = true;
        if (socket) {
            socket.on('friend_requested', data => {
                console.log('req received')
                if (isMounted && data.userIds.includes(userId)) {
                        setUpdate(true)
                    }
            })

            socket.on("friend_added", data => {
                console.log("friend req accepted")
                if (isMounted && data.userIds.includes(userId)) {
                    setUpdate(true)
                }
            })
            socket.on("req_denied", data => {
                console.log("friend req denied")
                if (isMounted && data.userIds.includes(userId)) {
                    setUpdate(true)
                }
            })
        }

        return () => { isMounted = false }
    }, [])

    return (
        <div>
            <h5>Friend Requests</h5>
            {reqList ? reqList.map(req => 
                <FriendReq 
                    key={req[0]} 
                    req={req} 
                    setUpdate={setUpdate}
                />) : <p>None</p>}
            <br/>
            <h5>Friends</h5>
            {friendList ? friendList.map(friend => 
            <div>
                {`${friend[1]} ${friend[2]}`}
            </div>
            ) : <p>None</p>}

            <h5>Pending</h5>
            {pendingList ? pendingList.map(pendingFriend => 
            <div>
                {`${pendingFriend[1]} ${pendingFriend[2]}`}
            </div>
            ) : ''}
            <br/>
        </div>
    )


}