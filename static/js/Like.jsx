const Like = ({noteId}) => {
    const [liked, setLiked] = useState(False)
    const [numLikes, setNumLikes] = useState(0)

    useEffect(() => {
        getLikeInfo()
    }, [liked, numLikes])

    const getLikeInfo = () => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({
                'note_id': noteId, 
                'user_id': localStorage.get('user_id') })
        }

        fetch("/login", reqOptions)
        .then(res => res.json())
        .then(data => {
            setNumLikes(data.numLikes)
            setLiked(data.likedByUser)
        })
    }

    const like = () => {
        
    }

    const unlike = () => {

    }

    return(
        <div>
            { liked ? 
                <Button onClick={unlike}>
                    <i class="fas fa-heart"></i>
                </Button> :
                <Button onClick={like}>
                    <i class="far fa-heart"></i>
                </Button>
            }
        </div>
        
    )
}