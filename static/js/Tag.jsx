const Tag = ({tag, setFilter, setShowAll}) => {
    const tag_id = tag.tag_id
    // const history = useHistory()

    // const getTaggedDocs = () => {
    //     fetch(`/docs/tags/${tag_id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         history.push('/dashboard', {params: data })
    //     })
    // }
    const handleTagFilter = () => {
        setFilter(tag_id)
        setShowAll(true)
    }
    return(
        <Badge pill onClick={handleTagFilter}>
            {tag.tag}
        </Badge>
    )
}