const Invitation = ({invitation, invAction, setInvAction}) => {
    const created_at = new Date(invitation.created_at)
    const socket = useContext(SocketContext)
    const history = useHistory()

    const accept = () => {
        console.log('accepting note...')
        socket.emit('accept_invite', {
            'followId': invitation.invite_id,
            'msg': `${localStorage.getItem('fname')} accepted your invite`
        })
        setInvAction(!invAction)
        
        fetch(`/docs/${invitation.doc_id}`)
        .then(res => res.json())
        .then(data => {
            history.push('/article', {params: data})
        })
    }

    const decline = () => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({
                'followId': invitation.invite_id, 
            })
        }

        fetch("/decline", reqOptions)
        .then(res => res.text())
        .then(data => setInvAction(!invAction))
    }
    return(
        <div id="invite-cont">
            <span id="invite-title">{invitation.title}</span>
            <br/>
            <span id="inviter">{invitation.inviter}    </span>
            <span id="invite-timestamp">{moment(created_at).startOf('minute').fromNow()}</span> 
            <br/>
            <span id="invite-msg">{invitation.invite_msg}</span>
            <br/>
            <Button className="invite-btn" variant="outline-light" size="sm" onClick={accept}>
                Accept
            </Button> 
            <Button className="invite-btn" variant="outline-light" size="sm" onClick={decline}>
                Decline
            </Button>
        </div>
    )
}