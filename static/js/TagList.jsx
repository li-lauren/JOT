const TagList = ({doc_id}) => {
    const socket = useContext(SocketContext)
    const [tagList, setTagList] = useState(null)
    const [tagAdded, setTagAdded] = useState(false)

    const getTags = () => {
        fetch(`/tag/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            setTagList(data)
            setTagAdded(false)
        })
    }

    useEffect(() => {
        getTags()
    }, [tagAdded, doc_id])


    useEffect(() => {
        let isMounted = true;
        if (socket) {
            socket.on("tag_added", () => {
                
                if (isMounted) {
                    setTagAdded(true)
                }
            })
        }

        return () => { isMounted = false };
    }, [])

    return(
        <div>
            {tagList ? tagList.map(tag => 
            <Badge pill key={tag.tag_id}>
                {tag.tag}
            </Badge>
            ) : ''}
            <AddTag doc_id={doc_id}/>
        </div>
    )
}