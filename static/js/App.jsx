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
    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('user_id') !== null)

    console.log(loggedIn)
    // React.useEffect(() => {
    //     fetch('/login')
    //     .then(res => res.text())
    //     .then(data => {
    //         if (data) { setLoggedIn(true) }
    //     })
    // }, [])

    const RequireAuth = ({ children }) => {
        if (!loggedIn) {
            return <Redirect to={'/login'} />;
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
                               <Dashboard {...props} setLoggedIn={setLoggedIn} /> 
                            )} 
                        />
                    </RequireAuth>  
                </Switch>     
            </Router>
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));