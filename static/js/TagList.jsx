const TagList = ({doc_id}) => {
    const socket = useContext(SocketContext)
    const [tagList, setTagList] = useState(null)
    const [tagAdded, setTagAdded] = useState(false)

    const getTags = () => {
        console.log('GETTAGS')
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
                console.log("tag added")
                //console.log(isMounted)
                
                if (isMounted) {
                    console.log("setting tag")
                    setTagAdded(true)
                }
            })
        }

        return () => { isMounted = false };
    }, [])

    console.log(tagAdded)

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