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

    // const login = () => {
    //     const reqOptions = {
    //         method: 'POST',
    //         body: JSON.stringify({userInput})
    //     }
    //     fetch("/login", { method: 'POST' }, reqOptions)
    //     .then(res => res.json())
    //     .then()
    // }

    return(
        <div>
            <h5>Login</h5>
            <form action="/login" method="POST">
                <label>Email</label>
                <input type="text" name="email" value={userInput.email} onChange={handleChange} />
                <label>Password</label>
                <input type="text" name="pw" value={userInput.pw} onChange={handleChange} />
                <br/>
                <button type="submit">Login</button>
            </form>    
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
            <form action="/users" method='POST'>
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
            </form>   
        </div>   
    )
}

const CreateArticle = () => {
    const [userInput, setUserInput] = React.useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
            url: '', 
            tag: '',
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
            <h5>Add an Article</h5>
            <form action="/articles" method='POST'>
                <label>URL</label>
                <input type="text" name="url" value={userInput.url} onChange={handleChange} />
                <label>Tag</label>

               
                <button type="submit">Add</button>
            </form>   
        </div>   
    )
}

const ArticleLibrary = () => {
    return (
        <div></div>
    )
}

const App = () => {

    return(
        <div>
            <Login />
            <SignUp />
            <CreateArticle />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));