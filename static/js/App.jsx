const Router = ReactRouterDOM.BrowserRouter;
const Redirect = ReactRouterDOM.Redirect;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const Link = ReactRouterDOM.Link;

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
    const [loggedIn, setLoggedIn] = React.useState(false)

    console.log(loggedIn)
    React.useEffect(() => {
        fetch('/login')
        .then(res => res.text())
        .then(data => {
            if (data) { setLoggedIn(true) }
        })
    }, [])

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
                            <Login {...props} setLoggedIn={setLoggedIn} />
                        )}
                    />
                
                    <RequireAuth>
                        <Route exact path={'/dashboard'} component={Dashboard} />
                    </RequireAuth>  
                </Switch>     
            </Router>
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));