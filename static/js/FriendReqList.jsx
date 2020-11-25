const FriendReqList = () => {
    const [update, setUpdate] = useState(false)
    const [reqList, setReqList] = useState(null)
    const [friendList, setFriendList] = useState(null)
    const [pendingList, setPendingList] = useState(null)
    const socket = useContext(SocketContext)

    useEffect(() => {
        getReqs()
        getFriends()
        setUpdate(false)
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
                if (isMounted && data.acceptor_id 
                    == localStorage.getItem('user_id')) {
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