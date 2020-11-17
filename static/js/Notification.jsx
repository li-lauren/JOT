const Notification = ({msg}) => {
    const [show, setShow] = useState(true)

    const handleClose = () => {
        setShow(false)
        //TODO: remove from notification list
    }

    return(
        <div>
            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                {/* <Modal.Title>Notification Type</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>{msg}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Accept 
                </Button>
                </Modal.Footer>
            </Modal> 
        </div>
    )
}