const TagList = ({doc_id}) => {
    const socket = useContext(SocketContext)
    // const [tagList, setTagList] = useState(null)
    const [tagAdded, setTagAdded] = useState(false)

    const [selectedTags, setSelectedTags] = useState(null)
    const [unselectedTags, setUnselectedTags] = useState(null)

    const getTags = () => {
        fetch(`/tag/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            setSelectedTags(data.selected_tags)
            setUnselectedTags(data.unselected_tags)
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

    const selectTag = (tag_id) => {
        if (socket) {
            console.log('Selecting Tag')
            console.log(tag_id)
            socket.emit('select_tag', {'tag_id': tag_id, 'doc_id': doc_id})
        }
    }

    const unselectTag = (tag_id) => {
        if (socket) {
            console.log('Unselecting Tag')
            socket.emit('uselect_tag', {'tag_id': tag_id, 'doc_id': doc_id})
        }
    }

    return(
        <div>
            {selectedTags ? selectedTags.map(tag => 
            <Badge pill 
                key={tag.tag_id}
                onClick={() => unselectTag(tag.tag_id)}
            >
                {tag.tag}
            </Badge>
            ) : ''}
            {/* <AddTag doc_id={doc_id}/> */}
            {unselectedTags ? unselectedTags.map(tag => 
            <Badge pill 
                key={tag.tag_id} 
                onClick={() => selectTag(tag.tag_id)}
            >
                {tag.tag}
            </Badge>
            ) : ''}
        </div>
    )
}