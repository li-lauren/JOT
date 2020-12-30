const Reply = ({reply, noteColor}) => {
    const [showNoteInput, setShowNoteInput] = useState(false)

    const created_at = new Date(reply.created_at)
    const reply_id = reply.note_id

    return(
        <div
            className="reply"
            style={{backgroundColor: noteColor}}
        >
            <span id="note-name">{reply.fname} / </span>
            <span id="timestamp">{moment(created_at).startOf('minute').fromNow()}</span>
            {'       '}
            <Like noteId={reply_id} />
            <br/>
            <p id="note-body">{reply.body}</p>
            
            { showNoteInput ?
                <i 
                    class="material-icons"
                    id="reply-btn"
                    onClick={() => setShowNoteInput(false)}
                >expand_less</i> :
                <i 
                    class="material-icons"
                    id="reply-btn"
                    onClick={() => setShowNoteInput(true)}
                >expand_more</i>
            }
            { showNoteInput ?
                <AddNoteReply 
                    parent_id={reply_id}
                    setShowNoteInput={setShowNoteInput}
                />
                : ''}
            <ReplyList parent_id={reply_id} />

        </div>
    )
}