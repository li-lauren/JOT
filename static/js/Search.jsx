const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [options, setOptions] = useState(null)

    const socket = useContext(SocketContext)
    const user_id = localStorage.getItem('user_id')

    useEffect(() => {
        let isMounted = true;
       
        if (socket) {
            socket.on('autocomplete', data => {
                console.log('autocomplete res received')
                if (isMounted && data.user_id == user_id) {
                    setOptions(data.options)
                    console.log(data.options)
                }   
            })
        } 
        
        return () => { isMounted = false };
    })

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

    const getAutocomplete = e => {
        setSearchTerm(e.target.value)
        socket.emit('search', {'search_term':e.target.value, 'user_id':user_id})
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
                    onChange={e => getAutocomplete(e)}
                />
               
                <Button type="submit" className="mb-2">
                    Submit
                </Button>
            </Form>
            {options ? options.map((option, i) => 
                <div key={i}>
                    {option}
                </div>
                    ): ''}
        </div>
    )
}