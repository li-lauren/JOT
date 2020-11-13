const FollowerList = ({doc_id}) => {
    const [followerAdded, setFollowerAdded] = React.useState(false)
    const [followerList, setFollowerList] = React.useState([])

    // console.log(`DOC ID: ${doc_id}`)
    React.useEffect(() => {
        getFollowers()
    }, [followerAdded, doc_id])

    const getFollowers = () => {
        fetch('/followers')
        .then(res => res.json())
        .then(data => {
            setFollowerList(data)
            // ("msg" in data) ? setFollowerList([]) : setFollowerList(data);
        })
    }

    return (
        <div>
            <h5>Following</h5>
            {followerList.length > 0 ? (followerList.map(follower => 
                <li key={follower.user_id}>
                    {follower.fname} {follower.lname}
                </li>)) : <p>None</p>}
            <br/>
            <AddFollower 
                followerAdded={followerAdded}
                setFollowerAdded={setFollowerAdded} 
            />
        </div>
    )
}
