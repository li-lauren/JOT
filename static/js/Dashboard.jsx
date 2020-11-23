

const Dashboard = ({setLoggedIn}) => {

    const socket = useContext(SocketContext)
    
    // const location = useLocation()
    // const data = location.state.params
    // const ownedDocsWithTag = data['ownedDocsWithTag']
    // const followedDocsWithTag = data['followedDocsWithTag']

    // console.log(ownedDocsWithTag)
    // console.log(followedDocsWithTag)
    
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
            {/* <TagLibrary /> */}
            <DocList />
            <InvitationList socket={socket}/>
            <Search />
            <br/>
            Doc Search
            <DocSearch />
        </div>
    )

}