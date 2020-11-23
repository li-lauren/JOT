const TagLibrary = ({setFilter}) => {
    const [tagLib, setTagLib] = useState(null)
    const [showAll, setShowAll] = useState(false)

    const getTagLib = () => {
        fetch(`/tag`)
        .then(res => res.json())
        .then(data => 
            setTagLib(data))
    }

    useEffect(() => {
        getTagLib()
    }, [])

    const toggleShowAll = () => {
        setFilter(null)
        setShowAll(false)
    }


    return(
        <div>
            {tagLib ? tagLib.map(tag => 
            <Tag pill 
                key={tag.tag_id} 
                tag={tag} 
                setFilter={setFilter}
                setShowAll={setShowAll}/>
            ) : ''}
            {showAll ? 
            <Badge pill onClick={toggleShowAll}>
                Show All
            </Badge> : ''}
                
        </div>
    )
}