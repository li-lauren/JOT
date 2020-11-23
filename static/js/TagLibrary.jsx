const TagLibrary = () => {
    const [tagLib, setTagLib] = useState(null)

    const getTagLib = () => {
        fetch(`/tag`)
        .then(res => res.json())
        .then(data => 
            setTagLibrary(data))
    }

    useEffect(() => {
        getTabLib()
    }, [])


    return(
        <div>
            {tagLib ? tagLib.map(tag => 
            <Badge pill key={tag.tag_id}>
                {tag.tag}
            </Badge>
            ) : ''}
        </div>
    )
}