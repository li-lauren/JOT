const DocSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [options, setOptions] = useState(null)

    const socket = useContext(SocketContext)
    const user_id = localStorage.getItem('user_id')
    const history = useHistory()
    
    useEffect(() => {
        let isMounted = true

        if (socket) {
            socket.on('docMatches', data => {
                console.log('doc autocomplete received')
                if (isMounted) {setOptions(data.options)}
            })    
        }

        return () => { isMounted = true }
    })

    const getDoc = doc => {
        
        // console.log('Get profile')

        // fetch(`/profile/${email}`)
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        //     history.push('/profile', {params: data})
        // })
    }


    const getDocMatches = e => {
        setSearchTerm(e.target.value)
        socket.emit('doc_search', {'search_term':e.target.value, 'user_id':user_id})
    }

    return(
        <div>
            <Form inline>
                <Form.Label htmlFor="inlineFormInputName2" srOnly>
                    Article Search
                </Form.Label>
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id="inlineFormInputName2"
                    placeholder="Article Search"
                    value={searchTerm}
                    onChange={e => getDocMatches(e)}
                />
            </Form>

            {options ? options.map((option, i) => 
                <div key={i} onClick={() => getDoc(option)}>
                    {option}
                </div>
                    ): ''}

        </div>
    )
}