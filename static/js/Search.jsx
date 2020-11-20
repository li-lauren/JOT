const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log('Submit Search')

        const reqOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'searchTerm': searchTerm
            })
        }

        fetch('/search', reqOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    return(
        <div>
            <Form inline onSubmit={handleSubmit}>
                <Form.Label htmlFor="inlineFormInputName2" srOnly>
                    Search
                </Form.Label>
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id="inlineFormInputName2"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
               
                <Button type="submit" className="mb-2">
                    Submit
                </Button>
            </Form>
        </div>
    )
}