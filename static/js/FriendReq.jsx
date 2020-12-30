const FriendReq = ({req, setUpdate}) => {
    const req_id = req[0]
    const fname = req[1]
    const lname = req[2]
    const socket = useContext(SocketContext)

    const accept = () => {
        console.log('accepting friend req')
        socket.emit('accept_friend_req', {
            'req_id': req_id
        })
        setUpdate(true)
    } 

    const decline = () => {
        console.log('declining friend req')
        socket.emit('decline_friend_request', {
            'req_id': req_id
        })
        setUpdate(true)
    }
    
    return(
        <div>
            {`${fname} ${lname}    `} 
            
                <i onClick={accept} className="far fa-check-circle"></i>
                {`   `}
                <i onClick={decline} className="far fa-times-circle"></i>
           
        </div>
    )
}