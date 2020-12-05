const Home = ({loggedIn, setLoggedIn}) => {
    // const [showSignUp, setShowSignUp] = useState(false)
    let url = 'https://assets.archpaper.com/wp-content/uploads/2020/09/1969.03-02.03.0019.jpg'
    // url = 'static/js/circle_packing_gif.gif'
    const [showLogin, setShowLogin] = useState(false)

    return (

        <div>
            <div id="welcome-cont">
                <div className="welcome stroke">WELCOME TO JOT</div>
                <br/>
                <div className="welcome">WELCOME TO <span id="JOT">JOT</span></div>
                <br/>
                <div className="welcome stroke">
                    WELCOME TO JOT
                    
                </div>
                
                {/* <div id="home-img-cropper">
                    <img id="home-img" src={url} alt=""/>
                </div> */} 
                {showLogin ? 
                    <div id="login-circle">
                        <Tabs defaultActiveKey="login" id="login-tabs">
                            <Tab eventKey="login" title="Login">
                                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                            </Tab>
                            <Tab eventKey="signUp" title="Sign Up">
                                <SignUp />
                            </Tab>
                        </Tabs>
                    </div> :
                    <div id="home-circle"></div>
                }
                {/* <p id="login-join" onClick={()=> setShowLogin(true)}>LOGIN / JOIN</p> */}
                <div className="slash">/</div>

                <div id="home-btns">
                    <p id="login-btn">Login</p>
                    <p id="signup-btn">Sign Up</p>
                </div>
                
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