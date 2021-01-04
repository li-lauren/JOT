const Router = ReactRouterDOM.BrowserRouter;
const { Redirect, Switch, Link, Route } = ReactRouterDOM;


const SocketContext = React.createContext();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem('user_id') !== null)

    const [socket, setSocket] = useState(null)

    const connectSocket = () => {
        // setSocket(io.connect('http://0.0.0.0:5000/'))
        setSocket(io.connect('https://j-o-t.herokuapp.com/'))
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

    console.log(socket)

    return(
        
        <SocketContext.Provider value={socket}>
            <Router>
                <Switch>
                    <Route 
                        exact path={'/'} 
                        render={(props) => (
                            <Home {...props} 
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn} />
                        )} 
                    />
                    <RequireAuth>
                        <Route 
                            exact path={'/dashboard'}
                            render={(props) => (
                            <Dashboard {...props} /> 
                            )} 
                        />
                        <Route 
                            exact path={'/article'}
                            render={(props) => (
                                <Doc {...props} />
                            )}
                        />
                        <Route 
                            exact path={'/profile'}
                            render={(props) => (
                                <UserProfile {...props} />
                            )}
                        />
                        <Route 
                            exact path={'/myProfile'}
                            render={(props) => (
                                <MyProfile {...props} setLoggedIn={setLoggedIn}/>
                            )}
                        />

                        <Route 
                            path={['/dashboard', '/article']}
                            render={(props) => (
                                <Notifications {...props} />
                            )}
                        />
                    </RequireAuth>  
                </Switch>     
            </Router>
        </SocketContext.Provider>
        
    )
}

ReactDOM.render(<App />, document.getElementById('root'));