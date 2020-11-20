const Like = ({noteId, socket}) => {
    const [liked, setLiked] = useState(false)
    const [numLikes, setNumLikes] = useState(0)
    const userId = localStorage.getItem('user_id')

    const info = {'note_id': noteId, 'user_id': userId }

    useEffect(() => {
        getLikeInfo()
    }, [liked, numLikes])

    useEffect(() => {
        let isMounted = true;
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('note_liked', data => {
                console.log('noted liked!')
                if (isMounted && data.noteId == noteId) {
                    setLiked(true)
                }   
            })

            socket.on('note_unliked', data => {
                console.log('noted unliked!')
                if (isMounted && data.noteId == noteId) {
                    setLiked(false)
                }   
            })
        } 
        
        return () => { isMounted = false };
    })

    const getLikeInfo = () => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify(info)
        }

        fetch("/likes", reqOptions)
        .then(res => res.json())
        .then(data => {
            setNumLikes(data.numLikes)
            setLiked(data.likedByUser)
        })
    }

    const like = () => {
        console.log('liking note...')
        socket.emit('like_note', info)
    }

    const unlike = () => {
        console.log('unliking note...')
        socket.emit('unlike_note', info)
    }

    return(
        <div>
            { liked ? 
                <span>
                    <i className="fas fa-heart"
                        onClick={unlike}>
                    </i> 
                    {` ${numLikes}`}
                </span>
                :
                <span>
                    <i className="far fa-heart"
                        onClick={like}>
                    </i> 
                    {` ${numLikes}`}
                </span>
            }
            
        </div>
        
    )
}