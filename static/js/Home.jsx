const Home = ({loggedIn, setLoggedIn}) => {
    
    const [showLoginCircle, setShowLoginCircle] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    const handleLogin = () => {
        setShowLoginCircle(true)
        setShowLogin(true)
        setShowSignup(false)
    }

    const handleSignup = () => {
        setShowLoginCircle(true)
        setShowLogin(false)
        setShowSignup(true)
    }

    return (

        <div>
            <Navbar />
            <div id="welcome-cont">
                <div className="welcome stroke">WELCOME TO JOT</div>
                <br/>
                <div className="welcome">WELCOME TO <span id="JOT">JOT</span>
                </div>
                <br/>
                <div className="welcome stroke">
                    WELCOME TO JOT    
                </div>
                
                {showLoginCircle ? 
                    <div id="login-circle">
                    </div> :
                    <div id="home-circle"></div>
                }
    
                <div className="slash">/</div>
        
                <div id="home-menu">
                    <span onClick={handleLogin}>LOGIN</span> / 
                    {' '}<span onClick={handleSignup}>SIGN UP</span>
                </div>

                {showLogin ? <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : ''}
                {showSignup ? <SignUp /> : ''}
                                
            </div>
               
            <Container id="home-container">
                {/* <Row className="align-self-center align-items-center w-100">
                    <Col xs={12} md={8}>
                        <h1>HOME</h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                            <Tab eventKey="login" title="Login">
                                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                            </Tab>
                            <Tab eventKey="signUp" title="Sign Up">
                                <SignUp />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>    */}
            </Container>

        </div>
        


       
    )
}