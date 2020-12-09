// Component for adding an article

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

    const addDoc = e => {
        e.preventDefault()

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
                    autoComplete="off"
                />
                <Form.Control type="submit" style={{display: 'none'}} />
            </Form>
        </div>   
    )
}