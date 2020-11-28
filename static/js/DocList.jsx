const Router = ReactRouterDOM.BrowserRouter;
const { Redirect, Route } = ReactRouterDOM;

const DocList = ({showAddDoc}) => {
    const socket = useContext(SocketContext)
    const [docList, setDocList] = useState([])
    const [sharedList, setSharedList] = useState([])
    const [docAdded, setDocAdded] = useState(false)
    const [filter, setFilter] = useState(null)

    

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
    

    // if (docDets) {
    //     <Redirect to='/article' />
    // }

    return (
        <div>
            {showAddDoc ? <AddDoc docAdded={docAdded} setDocAdded={setDocAdded} /> : ''}
            
            <TagLibrary setFilter={setFilter}/>
            <h5>Doc Library</h5>
            <ul>
                {docList.length !== 0 ? docList.map(doc => 
                        <DocListing 
                            key={doc.doc_id} 
                            doc={doc}
                        />
                    ) : <p>Get started by adding an article!</p>}

                <br/>

                {sharedList.length !== 0 && <h6>Followed Docs</h6>}
                {sharedList ? sharedList.map(doc => 
                    <DocListing 
                        key={doc.doc_id} 
                        doc={doc}
                    />)
                : <p>None</p>}
            </ul>
            
           
            {/* {docDets ? <Doc data={docDets}/> : ''} */}
            
        </div>
    )
}