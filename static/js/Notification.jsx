const Notification = ({data}) => {
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
                <Modal.Body>{data.msg}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Accept 
                </Button>
                </Modal.Footer>
            </Modal> 
            {/* <Toast show={show} onHide={()=>setShow(false)}>
                <Toast.Header> */}
                    {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
                    {/* <strong className="mr-auto">Bootstrap</strong> */}
                    {/* <small>11 mins ago</small> */}
                {/* </Toast.Header>
                <Toast.Body>{msg}</Toast.Body>
            </Toast> */}
        </div>
    )
}