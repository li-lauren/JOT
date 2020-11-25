const FriendReqList = () => {
    const [reqUpdate, setReqUpdate] = useState(false)
    const [reqList, setReqList] = useState(null)
    const socket = useContext(SocketContext)

    useEffect(() => {
        getReqs()
    }, [reqUpdate])

    const getReqs = () => {
        fetch('/requests')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setReqList(data)
            setReqUpdate(false)
        })
    }

    useEffect(() => {
        let isMounted = true;
        if (socket) {
            socket.on('friend_requested', data => {
                console.log('req received')
                if (isMounted && data.acceptor_id 
                    == localStorage.getItem('user_id')) {
                        setReqUpdate(true)
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
                    setReqUpdate={setReqUpdate}
                />) : <p>None</p>}
            <br/>
        </div>
    )


}