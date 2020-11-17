const Router = ReactRouterDOM.BrowserRouter;
const { Redirect, Switch, Link, Route } = ReactRouterDOM;

const Navbar = () => {
    return(
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/signup'}>Sign Up</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'/dashboard'}>Dashboard</Link>
        </nav>
    )   
}



const App = () => {
    const [loggedIn, setLoggedIn] = React.useState(
        localStorage.getItem('user_id') !== null)

    console.log(loggedIn)
    // React.useEffect(() => {
    //     fetch('/login')
    //     .then(res => res.text())
    //     .then(data => {
    //         if (data) { setLoggedIn(true) }
    //     })
    // }, [])
    let socket;
    const connectSocket = () => {
        socket = io.connect('http://0.0.0.0:5000/')
        console.log('Connecting')
    }

    useEffect(() => {
        if (loggedIn) {
            connectSocket()
        }

        if (!loggedIn) {
            if (socket) {
                socket.disconnect()
                console.log('Disconnecting')
            }
        }
    }, [loggedIn])

    const RequireAuth = ({ children }) => {
        if (!loggedIn) {
            return <Redirect to={'/'} />;
        }

        return children;
    };

    return(
        <div>
            
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Route exact path={'/signup'} component={SignUp} />
                    <Route 
                        exact path={'/login'} 
                        render={(props) => (
                            <Login {...props} 
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn} />
                        )}
                    />
                
                    <RequireAuth>
                        <Route 
                            exact path={'/dashboard'}
                            render={(props) => (
                            <Dashboard {...props} 
                                setLoggedIn={setLoggedIn}
                                socket={socket} /> 
                            )} 
                        />
                        <Route 
                            exact path={'/article'}
                            // component={Doc}
                            render={(props) => (
                                <Doc {...props} socket={socket}/>
                            )}
                        />
                        <Route 
                            path={['/dashboard', '/article']}
                            render={(props) => (
                                <Notifications {...props} socket={socket} />
                            )}
                        />
                    </RequireAuth>  
                </Switch>     
            </Router>
        
            
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));