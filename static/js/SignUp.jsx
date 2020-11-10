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
                <input type="password" name="pw" value={userInput.pw} onChange={handleChange} />
                <br/>
                <button type="submit">Join Jot</button>
            </form> 
            <p>{msg}</p>  
        </div>   
    )
}