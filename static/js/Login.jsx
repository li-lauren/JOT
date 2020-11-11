const { Redirect } = ReactRouterDOM;
// const { Button } = ReactBootstrap;

const Login = ({loggedIn, setLoggedIn}) => {
    if (loggedIn) {
        return <Redirect to={'/dashboard'} />
    }
    
    const [userInput, setUserInput] = React.useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
            email: '', 
            pw: ''
        }
    );
    const [errorMsg, setErrorMsg] = React.useState('')

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setUserInput({[name]: value});
    }

    const loginErrors = ["Incorrect password", "No user associated with that email"]
    const login = (e) => {
        e.preventDefault()
        console.log('LOGIN')
        console.log(`UserInput: ${userInput}`)

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({
                'email': userInput.email, 
                'pw': userInput.pw })
        }

        fetch("/login", reqOptions)
        .then(res => res.text())
        .then(data => {
            setUserInput({ email: '', pw: ''})
            if (loginErrors.includes(data)) {
                setErrorMsg(data)
            } else {
                const info = data.split(" ")
                localStorage.setItem('user_id', info[0])
                localStorage.setItem('fname', info[1])
                localStorage.setItem('lname', info[2])
                setLoggedIn(true)
            }  
        })
    }

    return(
        <div>
            <h5>Login</h5>
            <form onSubmit={login} >
                <label>Email</label>
                <input type="text" name="email" value={userInput.email} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="pw" value={userInput.pw} onChange={handleChange} />
                <br/>
                {/* <button type="submit">Login</button> */}
                <Button variation="primary" type="submit">Login</Button>
            </form>
            <p>{errorMsg}</p>  
            
        </div>   
    )
}
