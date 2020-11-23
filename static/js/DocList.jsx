const Router = ReactRouterDOM.BrowserRouter;
const { Redirect, Route } = ReactRouterDOM;

const DocList = ({socket}) => {
    const [docDets, setDocDets] = React.useState('')
    const [docList, setDocList] = React.useState([])
    const [sharedList, setSharedList] = React.useState([])
    const [docAdded, setDocAdded] = React.useState(false)

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

    useEffect(() => {
        getDocList()
        getSharedDocList()
    }, [docAdded])

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
            <h5>Doc Library</h5>
            <ul>
                {docList.length !== 0 ? docList.map(doc => {
                    return (
                        <li key={doc.doc_id}>
                            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)}>
                                {doc.title}
                            </a>
                        </li>    
                    )               
                }) : <p>Get started by adding an article!</p>}

                <br/>

                {sharedList.length !== 0 && <h6>Followed Docs</h6>}
                {sharedList.map(doc => {
                    return (
                        <li key={doc.doc_id}>
                            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)}>
                                {doc.title}
                            </a>
                        </li>    
                    )               
                })}
            </ul>
            
            <AddDoc docAdded={docAdded} setDocAdded={setDocAdded} />
            {/* {docDets ? <Doc data={docDets}/> : ''} */}
            
        </div>
    )
}