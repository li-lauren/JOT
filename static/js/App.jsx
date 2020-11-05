const DocList = ({docs}) => {
    const [docDets, setDocDets] = React.useState('')
    const [docList, setDocList] = React.useState(docs)

    console.log(docList)

    const getDocDets = (doc_id, e) => {
        console.log(`doc_id: ${doc_id}`)
        e.preventDefault()
        console.log('getDocDets')
        fetch(`/docs/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setDocDets(data)
        })
    }

    return (
        <div>
            <h5>Doc Library</h5>
            <ul>
                {docs.map(doc => {
                    return (
                        <li key={doc.doc_id}>
                            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)}>
                                {doc.title}
                            </a>
                        </li>    
                    )               
                })}
            </ul>
            {/* <AddDoc setDocList={setDocList} /> */}
            <Doc data={docDets}/>
        </div>
    )
}

const Doc = ({data}) => {

    // const [doc, setDoc] = React.useState('')
    // const [authors, setAuthors] = React.useState('')
    let docData;

    console.log(`Data in Doc: ${data}`)

    if (data) {
        const authors = data.authors
        const doc = data.doc
        let img_url = ''
        console.log(data.img_urls)
        if (data.img_urls) {
            img_url = data.img_urls[0]
        }
        
        docData = [
            <h1>{doc.title}</h1>, 
            <p>{authors}</p>,
            <p>{doc.publish_date}</p>,
            <img src={img_url} alt="top_image"/>,
            <p>{doc.body}</p>
        ]
    }
    
    return(
        <div>
            {docData}
        </div>
    )
}

const AddFollower = () => {
    const [followerEmail, setFollowerEmail] = React.useState('')

    const handleChange = e => {
        setFollowerEmail(e.target.value)
    }

    const addFollower = (e) => {
        e.preventDefault()
        console.log('Add Follower')

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({
                'email': followerEmail
            })
        }
        fetch("/followers", reqOptions)
        .then(res => res.text())
        .then(data => console.log(`follower added: ${data}`))
    }

    return (
        <div>
            <h5>Invite Friends</h5>
            <form onSubmit={addFollower}>
                <label for="email"></label>
                <input 
                    type="text" name="email" 
                    value={follower} 
                    onChange={handleChange}
                />
                <button type="submit"> + </button>
            </form>   
        </div>  
    )
}

const AddDoc = ({setDocs}) => {
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

    const addDoc = (e) => {
        e.preventDefault()
        console.log('Add Doc')
        console.log(`UserInput: ${userInput}`)

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({
                'url': userInput.url,
                'tag': userInput.tag
            })
        }
        fetch("/docs", reqOptions)
        .then(res => res.text())
        .then(data => {
            console.log('Doc added')
            console.log(data) })
        .then(
            fetch("/docs")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDocs(data)
            })
        )
    }

    return(
        <div>
            <h5>Add an Article</h5>
            <form onSubmit={addDoc}>
                <label>URL</label>
                <input 
                    type="text" name="url" 
                    value={userInput.url} 
                    onChange={handleChange}
                />
                <label>Tag</label>

                <button type="submit">Add</button>
            </form>   
        </div>   
    )
}



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
            <AddDoc setDocs={setDocs} />
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
    const [msg, setMsg] = React.useState('')

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setUserInput({[name]: value});
    }

    const signUp = (e) => {
        e.preventDefault()
        console.log('SIGNUP')
        console.log(`UserInput: ${userInput}`)

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({
                'fname': userInput.fname,
                'lname': userInput.lname,
                'email': userInput.email, 
                'pw': userInput.pw, 
                'img': userInput.img 
            })
        }
        fetch("/users", reqOptions)
        .then(res => res.text())
        .then(data => {
            console.log(data)
            setMsg(data)
        })
    }

    return(
        <div>
            <h5>Sign Up</h5>
            <form onSubmit={signUp}>
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
            <p>{msg}</p>  
        </div>   
    )
}





const App = () => {

    return(
        <div>
            <SignUp />
            <Login />
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));