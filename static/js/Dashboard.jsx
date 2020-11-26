const Dashboard = ({setLoggedIn}) => {

    const socket = useContext(SocketContext)
    
    const logout = () => {
        console.log('Disconnecting...')
            if (socket) {
                socket.disconnect()
            }
        localStorage.clear()
        setLoggedIn(false)
        
    }

    return(
        <div id="dashboard">
            <h3>{`${localStorage.getItem('fname')}'s`} Dashboard</h3>
            <a href="" onClick={logout}>Logout</a>
            <DocList />
            <InvitationList />
        
            <br/>
            Doc Search
            <DocSearch />
        </div>
    )

}