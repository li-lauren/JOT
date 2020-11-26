const ReplyList = ({parent_id}) => {
    const [replyList, setReplyList] = useState(null)
    const [replyAdded, setReplyAdded] = useState(null)
    const [colorChange, setColorChange] = useState(null)

    const getReplies = () => {
        console.log('Getting Replies')
        fetch(`/replies/${parent_id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setReplyList(data)
        })
    }

    useEffect(() => {
        getReplies()
    }, [colorChange]) // maybe need to add room/note?

    useEffect(() => {
        let isMounted = true;
        if(socket) {
            socket.on('note_reply_created', reply => {
                setReplyAdded(reply)
            })

            socket.on('note_color_changed', data => {
                setColorChange(data.color)
                console.log(data.color)
            })
        }
    }, [])

    useEffect(() => {

        setReplyList(prevReplyList => [...prevReplyList, replyAdded])
        
    }, [replyAdded])

    return(
        <div>
            {replyList ? replyList.map(reply => {
                <Reply 
                    key={reply.note_id}
                    reply={reply}
                    noteColor={note.color}
                />
            }) : ''}
        </div>
    )
}