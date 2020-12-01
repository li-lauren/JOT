const highlightText = (idx, txt, termLen, optKey) => {
    let newTxt = [
        txt.substring(0, idx),
        <strong key={optKey} style={{color:"blue"}}>
            {txt.substring(idx, idx + termLen)}
        </strong>,
        txt.substring(idx + termLen)
    ]

    return newTxt;
}

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
               
                if (isMounted) {
                    // setOptions(data.options)
                    let term = data.search_term
                    console.log(data.options)
                    let newOptions = [...data.options]
                    
                    for (let i=0; i < newOptions.length; i++) {
                        let titleIdx = newOptions[i][4]
                        let authIdx = newOptions[i][5]
                        let optKey = newOptions[i][0]
                        if (titleIdx !== null) {
                            let titleTxt = newOptions[i][2]
                            let newTitleTxt = highlightText(titleIdx, titleTxt, term.length, optKey)
                            newOptions[i][2] = newTitleTxt
                        }

                        if (authIdx !== null) {
                            let authTxt = newOptions[i][3]
                            let newAuthTxt = highlightText(authIdx, authTxt, term.length, optKey)
                            newOptions[i][3] = newAuthTxt
                        }
                    }
                    setOptions(newOptions)
                }
            })    
        }

        return () => { isMounted = true }
    }, [])

    const getDoc = doc_id => {
        
        console.log(`Get Doc ${doc_id}`)

        fetch(`/docs/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            history.push('/article', {params: data})
        })
    }


    const getDocMatches = e => {
        setSearchTerm(e.target.value)
        socket.emit('doc_search', {'search_term':e.target.value, 'user_id':user_id})
    }


    return(
        <div style={{width:"50%"}}>
            <h5>Search the Library</h5>
            <Form>
                <Form.Label htmlFor="inlineFormInputName2" srOnly>
                    Article Search
                </Form.Label>
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id="inlineFormInputName2"
                    placeholder="Article Search"
                    value={searchTerm}
                    onChange={e => getDocMatches(e)}
                    autoComplete="off"
                />
            </Form>

            <span className="search-results">
                 {options ? options.map((option, i) => 
                    <div 
                        key={option[0]} 
                        onClick={() => getDoc(option[0])}
                        className="search-result"
                    >
                        <div>{option[2]}</div>
                        <div className="search-author">{option[3]}</div>    
                    </div>
                        ): ''}
            </span>
            

        </div>
    )
}