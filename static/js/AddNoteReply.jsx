const AddNoteReply = ({room, parent_id}) => {
    const [body, setBody] = useState('')

    const addReply = () => {
        if (socket) {
            console.log('Adding reply...')
            socket.emit('note_reply',
            {
                'body': body,
                'room': room,
                'parent_id': parent_id
            })
            setBody('')
        }
    }

    return(
        <Form onSubmit={addReply}>
            <Form.Group>
                <Form.Control 
                    size="sm" type="text" 
                    value={body} 
                    onChange={e => setBody(e.target.value)}
                    placeholder="Reply..." />
                <Form.Control type="submit" style={{display: 'none'}} />
            </Form.Group>
        </Form>
    )
}