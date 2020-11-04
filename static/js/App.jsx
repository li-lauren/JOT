const Login = () => {
    const [userInput, setUserInput] = React.useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
            email: '', 
            pw: ''
        }
    );
    const [errorMsg, setErrorMsg] = React.useState('')
    const [docs, setDocs] = React.useState([])

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
        .then(res => res.json())
        .then(data => {
            if (typeof(data) === 'string') {
                setErrorMsg(data)
            } else {
                setDocs(data)
                for (const doc of docs) {
                    console.log(`Success: ${doc.title}`)
                }  
                setErrorMsg('')
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
                <input type="text" name="pw" value={userInput.pw} onChange={handleChange} />
                <br/>
                <button type="submit">Login</button>
            </form>
            <p>{errorMsg}</p>  
            <DocList docs={docs}/>  
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