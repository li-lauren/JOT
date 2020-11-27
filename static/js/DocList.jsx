const Router = ReactRouterDOM.BrowserRouter;
const { Redirect, Route } = ReactRouterDOM;

const DocList = () => {
    const socket = useContext(SocketContext)
    const [docDets, setDocDets] = useState('')
    const [docList, setDocList] = useState([])
    const [sharedList, setSharedList] = useState([])
    const [docAdded, setDocAdded] = useState(false)
    const [filter, setFilter] = useState(null)

    const history = useHistory()

    const getDocList = () => {
        fetch("/docs")
        .then(res => res.json())
        .then(data => setDocList(data))
    }

    const getSharedDocList = () => {
        fetch("/followed_docs")
        .then(res => res.json())
        .then(data => setSharedList(data))
    }

    const getTaggedDocs = () => {
        fetch(`/docs/tags/${filter}`)
        .then(res => res.json())
        .then(data => {
            setDocList(data.ownedDocsWithTag)
            setSharedList(data.followedDocsWithTag)  
        })
    }
    console.log(filter)
    useEffect(() => {
        if (!filter) {
            getDocList()
            getSharedDocList()
        } else {
            getTaggedDocs()
        }
       
    }, [docAdded, filter])

    const getDocDets = (doc_id, e) => {
        console.log(`doc_id: ${doc_id}`)
        e.preventDefault()
        
        fetch(`/docs/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            setDocDets(data)
            history.push('/article', {params: data})
        })
    }

    
    useEffect(() => {
        let isMounted = true;
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('invite_accepted', data => {
                console.log('invite accepted')
                if (isMounted && data.follower == localStorage.getItem('user_id')) {
                    setDocAdded(!docAdded)
                }   
            })
        } 
        
        return () => { isMounted = false };
    }, [])
    

    if (docDets) {
        <Redirect to='/article' />
    }

    return (
        <div>
            <TagLibrary setFilter={setFilter}/>
            <h5>Doc Library</h5>
            <ul>
                {docList.length !== 0 ? docList.map(doc => {
                    return (
                        <p key={doc.doc_id}>
                            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)}>
                                {doc.title}
                            </a>
                        </p>    
                    )               
                }) : <p>Get started by adding an article!</p>}

                <br/>

                {sharedList.length !== 0 && <h6>Followed Docs</h6>}
                {sharedList.map(doc => {
                    return (
                        <p key={doc.doc_id}>
                            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)}>
                                {doc.title}
                            </a>
                        </p>    
                    )               
                })}
            </ul>
            
            <AddDoc docAdded={docAdded} setDocAdded={setDocAdded} />
            {/* {docDets ? <Doc data={docDets}/> : ''} */}
            
        </div>
    )
}