const Router = ReactRouterDOM.BrowserRouter;
const { Redirect, Switch, Link, Route } = ReactRouterDOM;

const Navbar = () => {
    return(
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/signup'}>Sign Up</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'/dashboard'}>Dashboard</Link>
            <Link to={'/user'}>User Profile</Link>
        </nav>
    )   
}

const SocketContext = React.createContext();



const App = () => {
    const [loggedIn, setLoggedIn] = React.useState(
        localStorage.getItem('user_id') !== null)

    const [socket, setSocket] = useState(null)

    console.log(loggedIn)
    // React.useEffect(() => {
    //     fetch('/login')
    //     .then(res => res.text())
    //     .then(data => {
    //         if (data) { setLoggedIn(true) }
    //     })
    // }, [])
    // let socket;
    const connectSocket = () => {
        // socket = io.connect('http://0.0.0.0:5000/')
        setSocket(io.connect('http://0.0.0.0:5000/'))
        console.log('Connecting')
    }

    useEffect(() => {
        if (loggedIn) {
            connectSocket()
            // setSocket(socket)
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

    console.log(socket)

    return(
        
        <SocketContext.Provider value={socket}>
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
                                // socket={socket} 
                            /> 
                            )} 
                        />
                        <Route 
                            exact path={'/article'}
                            // component={Doc}
                            render={(props) => (
                                <Doc {...props} 
                                // socket={socket}
                                />
                            )}
                        />
                        <Route 
                            exact path={'/user'}
                            render={(props) => (
                                <UserProfile {...props} />
                            )}
                        />
                        <Route 
                            path={['/dashboard', '/article']}
                            render={(props) => (
                                <Notifications {...props} 
                                // socket={socket} 
                                />
                            )}
                        />
                    </RequireAuth>  
                </Switch>     
            </Router>
        </SocketContext.Provider>
        
    )
}

ReactDOM.render(<App />, document.getElementById('root'));