const Invitation = ({invitation, invAction, setInvAction, socket}) => {
    const created_at = new Date(invitation.created_at)

    const accept = () => {
        console.log('accepting note...')
        socket.emit('accept_invite', {
            'followId': invitation.invite_id,
            'msg': `${localStorage.getItem('fname')} accepted your invite`
        })
        setInvAction(!invAction)
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
    }
    return(
        <div>
            {invitation.title}
            <br/>
            {invitation.inviter} {moment(created_at).startOf('minute').fromNow()}
            <br/>
            <Button variant="outline-secondary" size="sm" onClick={accept}>
                Accept
            </Button> 
            <Button variant="outline-secondary" size="sm" onClick={decline}>
                Decline
            </Button>
        </div>
    )
}