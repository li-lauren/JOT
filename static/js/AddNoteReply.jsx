// component for threaded notes

const AddNoteReply = ({parent_id, setShowNoteInput}) => {
    const socket = useContext(SocketContext)
    const [body, setBody] = useState('')
    const doc_id = localStorage.getItem('doc_id')

    const addReply = e => {
        e.preventDefault()

        // emit note reply
        if (socket) {
            console.log('Adding reply...')
            socket.emit('note_reply',
            {
                'body': body,
                'room': parseInt(doc_id),
                'parent_id': parent_id
            })
            setBody('')
            setShowNoteInput(false)
        }
    }

    const handleChange = e => {
        setBody(e.target.value)
    }

    return(
        <Form onSubmit={addReply}>
            <Form.Group>
                <Form.Control 
                    size="sm" type="text" 
                    value={body} 
                    onChange={e => handleChange(e)}
                    placeholder="Reply..." />
                <Form.Control type="submit" style={{display: 'none'}} />
            </Form.Group>
        </Form>
    )
}