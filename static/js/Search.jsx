const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [options, setOptions] = useState(null)

    const socket = useContext(SocketContext)
    const user_id = localStorage.getItem('user_id')
    const history = useHistory()

    useEffect(() => {
        let isMounted = true;
       
        if (socket) {
            socket.on('autocomplete', data => {
                console.log('autocomplete res received')
                if (isMounted && data.user_id == user_id) {
                    setOptions(data.options)
                }   
            })
        } 
        
        return () => { isMounted = false };
    }, [])

    const getProfile = email => {
        
        console.log('Get profile')

        fetch(`/profile/${email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            history.push('/profile', {params: data})
        })
    }

    const getAutocomplete = e => {
        setSearchTerm(e.target.value)
        socket.emit('search', {'search_term':e.target.value, 'user_id':user_id})
    }

    return(
        <div>
            <h5>User Search</h5>
            <Form inline 
                // onSubmit={handleSubmit}
            >
                <Form.Label htmlFor="inlineFormInputName2" srOnly>
                    Search
                </Form.Label>
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id="inlineFormInputName2"
                    placeholder="User Search"
                    value={searchTerm}
                    onChange={e => getAutocomplete(e)}
                    autoComplete="off"
                />
               
                {/* <Button type="submit" className="mb-2">
                    Submit
                </Button> */}
            </Form>
            {options ? options.map((option, i) => 
                <div key={i} onClick={() => getProfile(option)}>
                    {option}
                </div>
                    ): ''}
        </div>
    )
}