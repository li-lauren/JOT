const TagList = ({doc_id}) => {
    const [tagList, setTagList] = useState(null)
    const [tagAdded, setTagAdded] = useState(false)

    const getTags = () => {
        fetch(`/tag/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            setTagList(data)
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
                if (isMounted) {
                    setTagAdded(!tagAdded)
                }
            })
        }

        return () => { isMounted = false };
    }, [])



    return(
        <div>
            {tagList ? tagList.map(tag => 
            <Badge pill>
                {tag.tag}
            </Badge>
            ) : ''}
            <AddTag />
        </div>
    )
}