const AddNoteReply = () => {
    return(
        <Form>
            <Form.Group>
                <Form.Control size="sm" type="text" placeholder="Reply..." />
                <Form.Control type="submit" style={{display: 'none'}} />
            </Form.Group>
        </Form>
    )
}