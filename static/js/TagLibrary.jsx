const TagLibrary = ({setFilter}) => {
    const [tagLib, setTagLib] = useState(null)
    const [showAll, setShowAll] = useState(false)

    const getTagLib = () => {
        fetch(`/tag`)
        .then(res => res.json())
        .then(data => {
            setTagLib(data)
        })
            
    }

    console.log(tagLib)

    useEffect(() => {
        getTagLib()
    }, [])

    const toggleShowAll = () => {
        setFilter(null)
        setShowAll(false)
    }


    return(
        <div id="tag-lib-base" style={{'margin-bottom': '16px'}}>
            {tagLib ? tagLib.map(tag => 
            <Tag pill 
                key={tag.tag_id} 
                tag={tag} 
                setFilter={setFilter}
                setShowAll={setShowAll}/>
            ) : ''}
            {showAll ? 
            <Badge variant="secondary" pill onClick={toggleShowAll}>
                Show All
            </Badge> : ''}       
        </div>
    )
}