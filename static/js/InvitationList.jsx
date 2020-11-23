const InvitationList = ({socket}) => {
    const [invAction, setInvAction] = React.useState(false)
    const [invitationList, setInvitationList] = React.useState([])

    useEffect(() => {
        getInvitations()
    }, [invAction])

    useEffect(() => {
        let isMounted = true;
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('invite', data => {
                console.log('invite received')
                if (isMounted && data.invitee == localStorage.getItem('user_id')) {
                    setInvAction(true)
                }   
            })
        } 
        
        return () => { isMounted = false };
    }, [])

    const getInvitations = () => {
        fetch('/invitations')
        .then(res => res.json())
        .then(data => {
            setInvitationList(data)
        })
    }

    return (
        <div>
            <h5>Invitations</h5>
            {invitationList.length > 0 ? (invitationList.map(invitation => 
                <Invitation 
                    key={invitation.invite_id} 
                    invitation={invitation}
                    invAction={invAction}
                    setInvAction={setInvAction}
                    socket={socket}
                />))
                : <p>None</p>}
            <br/>
        </div>
    )
}