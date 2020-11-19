const Notification = ({data}) => {
    const [show, setShow] = useState(true)
    const [isHovering, setIsHovering] = useState(false)

    const handleClose = () => {
        setShow(false)
        //TODO: remove from notification list
    }

    const msgLst = data.msg.split(" ")
    const inviterName = msgLst[0]

    return(
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            { isHovering ? 
                <Alert 
                    show={show} 
                    onClose={() => setShow(false)}
                    variant="info"
                    dismissible
                >
                    {data.msg}
                </Alert>
                : 
                <Alert
                    show={show} 
                    onClose={() => setShow(false)}
                    variant="info"
                    dismissible
                >
                    <p>Invite from {inviterName}</p>
                </Alert>
            }
            

        </div>
        
       
        
    )
}



{/* <Toast show={show} onHide={()=>setShow(false)}>
                <Toast.Header> 
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> 
                    <strong className="mr-auto">Invite</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>{data.msg}</Toast.Body>
            </Toast> */}


{/* <Modal show={show} onHide={()=>setShow(false)}>
    <Modal.Header closeButton>
    <Modal.Title>Notification Type</Modal.Title>
    </Modal.Header>
    <Modal.Body>{data.msg}</Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
        Close
    </Button>
    <Button variant="primary" onClick={handleClose}>
        Accept 
    </Button>
    </Modal.Footer>
</Modal>   */}
