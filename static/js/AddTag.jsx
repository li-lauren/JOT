const AddTag = ({doc_id}) => {
    const socket = useContext(SocketContext)
    const [tag, setTag] = useState('')

    const handleInput = e => {
        setTag(e.target.value)
    }

    const addTag = e => {
        e.preventDefault()
        
        if (socket) {
            console.log('Adding tag...')
            socket.emit('add_tag', {'tag': tag, 'doc_id': doc_id})
            setTag('')
        }
    }

    return(
        <div></div>
    )
}

{/* <Form inline onSubmit={addTag}>
    <Form.Label htmlFor="inlineFormInputName2" srOnly>
        Add Tag
    </Form.Label>
    <Form.Control
        className="mb-2 mr-sm-2"
        id="inlineFormInputName2"
        placeholder="Add Tag"
        value={tag}
        onChange={handleInput}
    />
    
    <Button type="submit" className="mb-2" size="sm">
        +
    </Button>
</Form> */}