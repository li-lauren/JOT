const Invitation = ({invitation, invAction, setInvAction, socket}) => {
    const created_at = new Date(invitation.created_at)

    const accept = () => {
        console.log('accepting note...')
        socket.emit('accept_invite', {
            'followId': invitation.invite_id,
            'msg': `${localStorage.getItem('fname')} accepted your invite`
        })
    }
    return(
        <div>
            {invitation.title}
            <br/>
            {invitation.inviter} {moment(created_at).startOf('minute').fromNow()}
            <br/>
            <Button variant="outline-secondary" size="sm" onClick={()=> accept}>
                Accept
            </Button> 
            <Button variant="outline-secondary" size="sm">
                Decline
            </Button>
        </div>
    )
}