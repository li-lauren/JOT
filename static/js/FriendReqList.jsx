const FriendReqList = () => {
    const [update, setUpdate] = useState(false)
    const [reqList, setReqList] = useState(null)
    const [friendList, setFriendList] = useState(null)
    const [pendingList, setPendingList] = useState(null)

    const [showReqList, setShowReqList] = useState(false)
    const [showFriendList, setShowFriendList] = useState(false)
    const [showPending, setShowPending] = useState(false)

    const socket = useContext(SocketContext)
    const userId = parseInt(localStorage.getItem('user_id'))

    useEffect(() => {
        getReqs()
        getFriends()
        getPendingFriends()
        setUpdate(false)
    }, [update])

    console.log(update)

    const getReqs = () => {
        console.log("Getting REQUESTS")
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
                console.log(data.userIds)
                if (isMounted && data.userIds.includes(userId)) {
                        console.log('req received')
                        setUpdate(true)
                    }
            })

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

            socket.on("unfriended", data => {
                console.log("unfriended")
                if (isMounted && data.userIds.includes(userId)) {
                    setUpdate(true)
                }
            })
        }

        return () => { isMounted = false }
    }, [])

    return (
        <Row>
            <Col>
                <h5>
                    Friend Requests
                    {reqList ? <span className="count">
                        {`${reqList.length}`}</span> : ''}
                </h5>
                {reqList ? reqList.map(req => 
                    <FriendReq 
                        key={req[0]} 
                        req={req} 
                        setUpdate={setUpdate}
                    />) : <p>None</p>}
            </Col>
            
            <Col>
                <h5>
                    Friends
                    {friendList ? <span className="count">
                        {`${friendList.length}`}</span> : ''}
                </h5>

                {friendList ? friendList.map(friend => 
                <div key={friend[3]}>
                    {`${friend[1]} ${friend[2]}`}
                </div>
                ) : <p>None</p>}
            </Col>
            
            <Col>
                <h5>
                    Pending
                    {pendingList ? <span className="count">
                        {`${pendingList.length}`}</span> : ''}
                </h5>
                {pendingList ? pendingList.map(pendingFriend => 
                <div key={pendingFriend[3]}>
                    {`${pendingFriend[1]} ${pendingFriend[2]}`}
                </div>
                ) : ''}
            </Col>
        </Row>
    )


}