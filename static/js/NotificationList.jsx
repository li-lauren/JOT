const { ToastContainer, toast} = ReactToastify;

const Notifications = ({socket}) => {
    const [notificationList, setNotificationList] = useState([])
    const [notificationAdded, setNotificationAdded] = useState(null)
    
    // Toast test notification
    const notify = () => toast("Wow so easy !");

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
            {/* Test Toast Container */}
             <div>
                <button onClick={notify}>Notify !</button>
                <ToastContainer />
            </div>

            {notificationList.length ? 
                (notificationList.map((notification) => 
                    <Notification 
                        key={notification.follow_id} 
                        data={notification} 
                    />
                )) 
                : ''}            
        </div>
    )
}