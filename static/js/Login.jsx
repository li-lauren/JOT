const { Redirect } = ReactRouterDOM;
// const { Button } = ReactBootstrap;

const Login = ({loggedIn, setLoggedIn}) => {
    // if (loggedIn) {
    //     return <Redirect to={'/dashboard'} />
    // }
    
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
                localStorage.setItem('email', info[3])
                setLoggedIn(true)
            }  
        })
    }

    return(
        <div id="login">
            <br/>
            <form onSubmit={login}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="Email">
                        <span className="material-icons">
                            alternate_email
                        </span>
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="Email"
                        name="email"
                        value={userInput.email} 
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <FormControl
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="Password"
                    name="pw"
                    value={userInput.pw} 
                    onChange={handleChange}
                    />
                    <InputGroup.Append>
                    <InputGroup.Text id="Password">
                        <span className="material-icons">
                            visibility
                        </span>
                    </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <Button variant="outline-dark" type="submit">Login</Button>
            </form>

            <p>{errorMsg}</p>  
        </div>   
    )
}
