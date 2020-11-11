const { Redirect } = ReactRouterDOM;

const Dashboard = ({setLoggedIn}) => {

    const logout = () => {
        localStorage.clear()
        setLoggedIn(false)
        return <Redirect to={'/'} />
    }
    
    return(
        <div>
            <h3>Dashboard</h3>
            <a href="" onClick={logout}>Logout</a>
            <DocList />
        </div>
    )

}