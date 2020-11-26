const Home = ({loggedIn, setLoggedIn}) => {
    // const [showSignUp, setShowSignUp] = useState(false)

    return (
        <div>
             <h1>HOME</h1>

             <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Login">
                    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                </Tab>
                <Tab eventKey="signUp" title="Sign Up">
                    <SignUp />
                </Tab>
            </Tabs>
           
        </div>
       
    )
}