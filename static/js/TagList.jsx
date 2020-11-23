const TagList = () => {
    const [tagList, setTagList] = useState(null)

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