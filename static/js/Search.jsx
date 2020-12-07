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
        <div id="search-bar"> 
            <Form inline 
                // onSubmit={handleSubmit}
            >
                <Form.Label htmlFor="inlineFormInputName2" srOnly>
                    Search
                </Form.Label>
                <Form.Control
                    type="text"
                    className="user-search"
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
            <span className="search-results">
                {options ? options.map((option, i) => 
                    <div key={i} onClick={() => getProfile(option[0])} className="user-listing">
                        <span id="search-name">{option[1]}</span>
                        <br/>
                        <span>{option[0]}</span>
                    </div>
                        ): ''}
            </span>
            
        </div>
    )
}