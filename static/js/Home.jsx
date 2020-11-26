const Home = ({loggedIn, setLoggedIn}) => {
    return (
        <div>
             <h1>HOME</h1>

            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <SignUp />
        </div>
       
    )
}