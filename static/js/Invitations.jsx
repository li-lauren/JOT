const Invitations = () => {
    const [invitationAdded, setInvitationAdded] = React.useState(false)
    const [invitationList, setInvitationList] = React.useState([])

    React.useEffect(() => {
        getInvitations()
    }, [invitationAdded])

    const getInvitations = () => {
        fetch('/invitations')
        .then(res => res.json())
        .then(data => {
            setInvitationList(data)
            // ("msg" in data) ? setFollowerList([]) : setFollowerList(data);
        })
    }

    return (
        <div>
            <h5>Invitations</h5>
            {invitationList.length > 0 ? (invitationList.map(invitation => 
                <li key={invitation.invitation_id}>
                    {invitation.title} from {invitation.fname} {invitation.lname}
                </li>)) : <p>None</p>}
            <br/>
        </div>
    )
}