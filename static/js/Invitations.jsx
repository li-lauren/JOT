const Invitations = ({socket}) => {
    const [invitationAdded, setInvitationAdded] = React.useState(false)
    const [invitationList, setInvitationList] = React.useState([])

    useEffect(() => {
        getInvitations()
    }, [invitationAdded])

    useEffect(() => {
        let isMounted = true;
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('invite', data => {
                console.log('invite received')
                if (isMounted && data.invitee == localStorage.getItem('user_id')) {
                    setInvitationAdded(true)
                }   
            })
        } 
        
        return () => { isMounted = false };
    })

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
                <li key={invitation.invite_id}>
                    {invitation.title} from {invitation.inviter} {invitation.created_at}
                </li>)) : <p>None</p>}
            <br/>
        </div>
    )
}