const Notifications = ({socket}) => {
    const [notificationList, setNotificationList] = useState([])
    const [notificationAdded, setNotificationAdded] = useState(null)
    
    useEffect(() => {
        let isMounted = true;
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('invite', data => {
                console.log('invite received')
                if (isMounted && data.invitee == localStorage.getItem('user_id')) {
                    setNotificationAdded(data)
                }   
            })
        } 
        
        return () => { isMounted = false };
    })

    useEffect(() => {
        if (notificationAdded) {
            setNotificationList(prev => [notificationAdded, ...prev])
        }
    }, [notificationAdded])

    console.log(notificationList)

    return (
        <div>
            {notificationList.length ? 
                (notificationList.map((notification) => 
                    <Notification 
                        key={notification.follow_id} 
                        msg={notification.msg} 
                    />
                )) 
                : ''}            
        </div>
    )
}