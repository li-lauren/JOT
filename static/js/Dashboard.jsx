const Dashboard = ({setLoggedIn}) => {
    let socket;
    const [addSocket, setAddSocket] = useState('')

    const connectSocket = () => {
        socket = io.connect('http://0.0.0.0:5000/')
        console.log('Connecting')
    }
    const logout = () => {
        console.log('Disconnecting...')
            if (socket) {
                socket.disconnect()
            }
        localStorage.clear()
        setLoggedIn(false)
        
    }

    useEffect(() => {
        connectSocket()  
        console.log(socket) 
        setAddSocket(socket)
    }, [addSocket])
    
    console.log(addSocket)
    return(
        <div>
            <h3>{`${localStorage.getItem('fname')}'s`} Dashboard</h3>
            <a href="" onClick={logout}>Logout</a>
            <DocList />
        </div>
    )

}