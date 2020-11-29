const TagList = ({doc_id}) => {
    const socket = useContext(SocketContext)
    // const [tagList, setTagList] = useState(null)
    const [tagAdded, setTagAdded] = useState(false)

    const [selectedTags, setSelectedTags] = useState(null)
    const [unselectedTags, setUnselectedTags] = useState(null)
    const [showTags, setShowTags] = useState(false)

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
        // if (socket) {
        //     socket.on("tag_added", () => {   
        //         if (isMounted) {
        //             setTagAdded(true)
        //         }
        //     })
        // }

        if (socket) {
            socket.on("tags_updated", () => {
                if (isMounted) {
                    setTagAdded(true)
                }
            })
        }

        return () => { isMounted = false };
    }, [])

    const selectTag = (tag_id, tag) => {
        if (socket) {
            console.log('Selecting Tag')
            socket.emit('select_tag', 
                {'tag_id': tag_id, 'doc_id': doc_id, 'tag': tag})
        }
    }

    const unselectTag = (tag_id, tag) => {
        if (socket) {
            console.log('Unselecting Tag')
            socket.emit('uselect_tag', 
                {'tag_id': tag_id, 'doc_id': doc_id, 'tag': tag})
        }
    }

    console.log(selectedTags)
    return(
        <div>
            {selectedTags ? 
            <div>
                {selectedTags.map(tag => 
                    <Badge pill 
                        key={tag.tag_id}
                        onClick={() => unselectTag(tag.tag_id, tag.tag)}
                    >
                        {tag.tag}
                    </Badge>
                    )
                }

                <Badge pill 
                    onClick={() => setShowTags(!showTags)}
                >
                    {showTags ? 'Hide Tags' : '+ Tag'}
                </Badge>
            </div>
             : 
            ''}
            
            <br/>
            {/* <AddTag doc_id={doc_id}/> */}
            {showTags ? unselectedTags ? unselectedTags.map(tag => 
            <Badge pill 
                key={tag.tag_id} 
                onClick={() => selectTag(tag.tag_id, tag.tag)}
            >
                {tag.tag}
            </Badge>
            ) : '' : ''}
        </div>
    )
}