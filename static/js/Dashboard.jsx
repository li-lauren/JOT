const Dashboard = ({setLoggedIn}) => {

    const logout = () => {
        localStorage.clear()
        setLoggedIn(false)
    }
    
    return(
        <div>
            <h3>{`${localStorage.getItem('fname')}'s`} Dashboard</h3>
            <a href="" onClick={logout}>Logout</a>
            <DocList />
        </div>
    )

}