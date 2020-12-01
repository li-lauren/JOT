const AddDoc = () => {
    const history = useHistory()
    const [userInput, setUserInput] = useReducer(
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
        .then(res => res.json())
        .then(data => {
            console.log('Doc added')
            console.log(data) 
            // setDocAdded(!docAdded)
            setUserInput({
                url: '', 
                tag: '',
            })
            history.push('/article', {params: data})

        })
    }

    return(
        <div style={{width:"50%"}}>
            <h5>Add an Article</h5>
            <Form onSubmit={addDoc}>
                <Form.Control 
                    size="sm" 
                    type="text" 
                    placeholder="Article URL"
                    name="url" 
                    value={userInput.url} 
                    onChange={handleChange} 
                    style={{width:"100%"}}
                />
                <Form.Control type="submit" style={{display: 'none'}} />
            </Form>
            {/* <form onSubmit={addDoc}>
                <label>URL</label>
                <input 
                    type="text" name="url" 
                    value={userInput.url} 
                    onChange={handleChange}
                />
                <label>Tag</label>

                <button type="submit">Add</button>
            </form>    */}
        </div>   
    )
}