
const DocList = () => {
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
    

    return (
        <div className="doc-list">
            
            <TagLibrary setFilter={setFilter}/>
            <h5 id="doc-lib-h">Article Library</h5>
            <ul>
                {docList.length !== 0 ? docList.map(doc => 
                        <DocListing 
                            key={doc.doc_id} 
                            doc={doc}
                        />
                    ) : <p>Get started by adding an article!</p>}

                <br/>

                {sharedList.length !== 0 && <h5 id="follow-lib-h">Articles You Follow</h5>}
                {sharedList ? sharedList.map(doc => 
                    <DocListing 
                        key={doc.doc_id} 
                        doc={doc}
                    />)
                : <p>None</p>}
            </ul>
            
        </div>
    )
}