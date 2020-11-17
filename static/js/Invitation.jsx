const Invitation = ({invitation, invAction, setInvAction}) => {
    const created_at = new Date(invitation.created_at)

    const accept = () => {
        
    }
    return(
        <div>
            {invitation.title}
            <br/>
            {invitation.inviter} {moment(created_at).startOf('minute').fromNow()}
            <br/>
            <Button variant="outline-secondary" size="sm">
                Accept
            </Button> 
            <Button variant="outline-secondary" size="sm">
                Decline
            </Button>
        </div>
    )
}