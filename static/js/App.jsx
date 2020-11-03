const Login = () => {
    const [userInput, setUserInput] = React.useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
            email: '', 
            pw: ''
        }
    );

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setUserInput({[name]: value});
    }

    // add onSubmit

    return(
        <div>
            <h5>Login</h5>
            <label>Email</label>
            <input type="text" name="email" value={userInput.email} onChange={handleChange} />
            <label>Password</label>
            <input type="text" name="pw" value={userInput.pw} onChange={handleChange} />
            <br/>
            <button type="submit">Login</button>
        </div>   
    )
}

const SignUp = () => {
    const [userInput, setUserInput] = React.useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
            fname: '', 
            lname: '',
            email: '', 
            pw: '', 
            img: ''
        }
    );

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setUserInput({[name]: value});
    }

    // add onSubmit

    return(
        <div>
            <h5>Sign Up</h5>
            <label>First Name</label>
            <input type="text" name="fname" value={userInput.fname} onChange={handleChange} />
            <label>Last Name</label>
            <input type="text" name="lname" value={userInput.lname} onChange={handleChange} />
            
            <br/>
            <label>Email</label>
            <input type="text" name="email" value={userInput.email} onChange={handleChange} />
            <label>Password</label>
            <input type="text" name="pw" value={userInput.pw} onChange={handleChange} />
            <br/>
            <button type="submit">Join Jot</button>
        </div>   
    )
}

const App = () => {

    return(
        <div>
            <Login />
            <SignUp />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));