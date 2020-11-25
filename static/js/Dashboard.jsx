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
        <div>
            <h3>{`${localStorage.getItem('fname')}'s`} Dashboard</h3>
            <a href="" onClick={logout}>Logout</a>
            <DocList />
            <InvitationList socket={socket}/>
            <FriendReqList />
            <Search />
            <br/>
            Doc Search
            <DocSearch />
        </div>
    )

}