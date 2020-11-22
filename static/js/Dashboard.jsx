

const Dashboard = ({setLoggedIn}) => {

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

    return(
        <div>
            <h3>{`${localStorage.getItem('fname')}'s`} Dashboard</h3>
            <a href="" onClick={logout}>Logout</a>
            <DocList socket={socket}/>
            <InvitationList socket={socket}/>
            <Search />
            <br/>
            Doc Search
            <DocSearch />
        </div>
    )

}