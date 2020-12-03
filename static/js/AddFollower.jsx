const AddFollower = ({followerAdded, setFollowerAdded, socket, doc_id}) => {
    const [followerEmail, setFollowerEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [showForm, setShowForm] = useState(false)

    const handleChange = e => {
        setFollowerEmail(e.target.value)
    }

    const addFollower = (e) => {
        e.preventDefault()
        console.log('Add Follower')

        if (socket) {
            console.log('inviting follower...')
            socket.emit('invite_to_follow', {'email': followerEmail, 'msg': msg, 'doc_id': doc_id})
            setFollowerEmail('')
            setMsg('')
            setShowForm(false)
        }
    }

    const toggleShowForm = () => {
        setShowForm(!showForm)
    }

    return (
        <div id="add-followers">
            <span 
                class="add-follower-i"
                onClick={toggleShowForm}
            >
                + Invite
            </span>
            {showForm ? 
                <form onSubmit={addFollower}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            value={followerEmail} 
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Message</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            as="textarea" 
                            aria-label="Message" 
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                        />
                    </InputGroup>
                    {/* <input type="submit" style={{display: 'none'}} /> */}
                    {/* <button type="submit"> + </button> */}
                    <Button variant="outline-dark" type="submit" size="sm"> Invite </Button>
                </form> : ''
            } 
        </div>  
    )
}
