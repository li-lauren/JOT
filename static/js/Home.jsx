// Home page for user login and sign up

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
                    <span className="login-signup-btns" onClick={handleLogin}>LOGIN</span> / 
                    {' '}<span onClick={handleSignup} className="login-signup-btns">SIGN UP</span>
                </div>

                {showLogin ? <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : ''}
                {showSignup ? <SignUp /> : ''}
                                
            </div>

        </div>
        


       
    )
}