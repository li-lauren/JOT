const DocListing = ({doc}) => {
    const history = useHistory()
    const [isHovering, setIsHovering] = useState(false)
    const created_at = new Date(doc.created_at)

    const getDocDets = (doc_id, e) => {
        console.log(`doc_id: ${doc_id}`)
        e.preventDefault()
        
        fetch(`/docs/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            history.push('/article', {params: data})
        })
    }

    return (
        <div 
            className="doc-listing"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)} >
                {doc.title}
            </a>
            <br/>
            { isHovering ?
                <a>
                    {moment(created_at).format('MMMM Do, YYYY')}
                </a> : ''
            }
            
        </div>    
    )
}