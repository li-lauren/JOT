const Login = ({setLoggedIn}) => {
    const [userInput, setUserInput] = React.useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
            email: '', 
            pw: ''
        }
    );
    const [errorMsg, setErrorMsg] = React.useState('')
    // const [loggedIn, setLoggedIn] = React.useState(false)
    // const [docs, setDocs] = React.useState([])

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setUserInput({[name]: value});
    }

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
            setErrorMsg(data)
            setLoggedIn(true)
            // if (typeof(data) === 'string') {
            //     setErrorMsg(data)
            // } else {
            //     setDocs(data)
            //     for (const doc of docs) {
            //         console.log(`Success: ${doc.title}`)
            //     }  
            //     setErrorMsg('')
            // }   
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
                <button type="submit">Login</button>
            </form>
            <p>{errorMsg}</p>  
            {/* <Dashboard loggedIn={loggedIn} /> */}
            {/* <AddDoc setDocs={setDocs} />
            <DocList docs={docs}/>   */}
            
        </div>   
    )
}
