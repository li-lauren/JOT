const Reply = ({reply, noteColor}) => {
    const [showNoteInput, setShowNoteInput] = useState(false)

    const created_at = new Date(reply.created_at)
    const reply_id = reply.note_id

    return(
        <Button
            className="reply"
            style={{backgroundColor: noteColor}}
        >
            <span>{reply.fname}</span>
            <br/>
            {reply.body}
            <br/>
            {moment(created_at).startOf('minute').fromNow()}
            <Like noteId={reply_id} />
            {'   '}
            <i 
                className="far fa-comment-dots"
                onClick={() => setShowNoteInput(!showNoteInput)}
            ></i>
            { showNoteInput ? 
                <AddNoteReply 
                    parent_id={reply_id}
                /> : ''}
            <ReplyList parent_id={reply_id} />

        </Button>
    )
}