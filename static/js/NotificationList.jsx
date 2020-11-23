// const { ToastContainer, toast} = 'react-toastify';
// const { ToastContainer, toast} = ReactToastify;

const Notifications = () => {
    const [notificationList, setNotificationList] = useState([])
    const [notificationAdded, setNotificationAdded] = useState(null)
    
    // Toast test notification
    // const notify = () => toast("Wow so easy !");

    // Toastify JS
    // const notify = () => (Toastify({
    //     text: 'WOW SO EASY',
    //     duration: 3000,
    //     newWindow: true,
    //     close: true,
    //     gravity: "top", 
    //     position: 'right',
    //     backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    //     stopOnFocus: true, 
    //   }).showToast());

    const socket = useContext(SocketContext)

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
    }, [])

    useEffect(() => {
        if (notificationAdded) {
            setNotificationList(prev => [notificationAdded, ...prev])
        }
    }, [notificationAdded])

    console.log(notificationList)

    return (
        <div className="notification">
            {/* Test Toast Container */}
             {/* <div>
                <button onClick={notify}>Notify !</button>
                <ToastContainer />
            </div> */}

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