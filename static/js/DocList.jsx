const DocList = () => {
    const [docDets, setDocDets] = React.useState('')
    const [docList, setDocList] = React.useState([])
    const [sharedList, setSharedList] = React.useState([])
    const [docAdded, setDocAdded] = React.useState(false)

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

    React.useEffect(() => {
        getDocList()
        getSharedDocList()
    }, [docAdded])

    const getDocDets = (doc_id, e) => {
        console.log(`doc_id: ${doc_id}`)
        e.preventDefault()
        
        fetch(`/docs/${doc_id}`)
        .then(res => res.json())
        .then(data => setDocDets(data))
    }

    return (
        <div>
            <h5>Doc Library</h5>
            <ul>
                {docList.map(doc => {
                    return (
                        <li key={doc.doc_id}>
                            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)}>
                                {doc.title}
                            </a>
                        </li>    
                    )               
                })}

                <h6>Followed Docs</h6>
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
            {docDets ? <Doc data={docDets}/> : ''}
        </div>
    )
}