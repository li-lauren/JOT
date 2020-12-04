const FollowerList = ({doc_id, socket}) => {
    const [followerAdded, setFollowerAdded] = useState(false)
    const [followerList, setFollowerList] = useState([])
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        getFollowers()
    }, [followerAdded, doc_id])

    const getFollowers = () => {
        fetch('/followers')
        .then(res => res.json())
        .then(data => {
            setFollowerList(data)
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
            {followerList.length > 0 ? (followerList.map(follower => 
                <span 
                    key={follower.user_id}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="follower"
                >
                    { isHovering ?
                        <Button size="sm" className="follower">
                            {`${follower.fname} ${follower.lname}`}
                        </Button> :
                        <Button size="sm" className="follower">
                            {follower.fname[0]}
                        </Button>
                    }
                    
                </span>)) : <p>None</p>}
            
            <AddFollower 
                followerAdded={followerAdded}
                setFollowerAdded={setFollowerAdded} 
                socket={socket}
                doc_id={doc_id}
            />
        </div>
    )
}
