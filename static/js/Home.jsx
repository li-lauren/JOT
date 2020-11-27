const Home = ({loggedIn, setLoggedIn}) => {
    // const [showSignUp, setShowSignUp] = useState(false)

    return (
        
        <Container id="home-container">
            <Row className="align-self-center align-items-center w-100">
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
            </Row>   
        </Container>


       
    )
}