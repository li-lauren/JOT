

const Dashboard = ({setLoggedIn}) => {
    
    // const [addSocket, setAddSocket] = useState('')

    // let socket;
    // const connectSocket = () => {
    //     socket = io.connect('http://0.0.0.0:5000/')
    //     console.log('Connecting')
    // }

    const socket = useContext(SocketContext)
    console.log(socket)
    
    const logout = () => {
        console.log('Disconnecting...')
            if (socket) {
                socket.disconnect()
            }
        localStorage.clear()
        setLoggedIn(false)
        
    }

    // useEffect(() => {
    //     connectSocket()  
    //     console.log(socket) 
    //     setAddSocket(socket)
    // }, [])
    
    // console.log(addSocket)
    return(
        <div>
            <h3>{`${localStorage.getItem('fname')}'s`} Dashboard</h3>
            <a href="" onClick={logout}>Logout</a>
            <DocList socket={socket}/>
            <InvitationList socket={socket}/>
        </div>
    )

}