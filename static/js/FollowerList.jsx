const FollowerList = ({doc_id}) => {
    const [followerAdded, setFollowerAdded] = useState(false)
    const [followerList, setFollowerList] = useState(null)
    const [isHovering, setIsHovering] = useState(false)
    const socket = useContext(SocketContext)

    console.log(doc_id)
    useEffect(() => {
        getFollowers()
    }, [followerAdded, doc_id])

    const getFollowers = () => {
        console.log('getting followers')
        fetch(`/followers/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            setFollowerList(data)
            console.log(data)
        })
    }

    console.log(followerList)

    useEffect(() => {
        let isMounted = true;
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('invite_accepted', data => {
                console.log('invite accepted in follower list')
                if (isMounted && data.inviter == localStorage.getItem('user_id')) {
                    console.log('FOLLOWER ADDED')
                    setFollowerAdded(!followerAdded)
                }   
            })
        } 
        
        return () => { isMounted = false };
    }, [])

    return (
        <div>
            {followerList ? (followerList.map(follower => 
                <span 
                    key={follower.user_id}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="followers"
                >
                    { isHovering ?
                        <Button size="sm" variant="outline-light" className="follower">
                            {`${follower.fname} ${follower.lname}`}
                        </Button> :
                        <Button size="sm" variant="outline-light" className="follower">
                            {follower.fname[0]}
                        </Button>
                    }
                    
                </span>)) : ''}
            
            <AddFollower 
                followerAdded={followerAdded}
                setFollowerAdded={setFollowerAdded} 
                socket={socket}
                doc_id={doc_id}
            />
        </div>
    )
}
