// functions for connecting with Socket.io
let socket;

const connectSocket = (room) => {
    socket = io.connect('http://0.0.0.0:5000/');
    console.log('Connecting...');
    if (socket && room) {
        socket.emit('join', room)
    }
}

const disconnectSocket = () => {
    console.log('Disconnecting...');
    if (socket) {
        socket.disconnect();
    }
}

// End Socket functions


const Doc = (props) => {
    const location = useLocation()
    const data = location.state.params
    console.log(`data: ${data.doc}`)
    const authors = data.authors
    const doc = data.doc
    const room = doc.doc_id
    const publish_date = new Date(doc.publish_date)

    let img_url = ''

    if (data.img_urls) {
        img_url = data.img_urls[0]
    }
    
    useEffect(() => {

        if (room) {
            connectSocket(room);
            console.log(`Joined Room ${room}`)
        }

        return () => {
            disconnectSocket()
        }
    }, [room]);

    
    
    const docData = [
        <Row>
            <h1>{doc.title}</h1>
        </Row>, 
        <Row>
            <FollowerList doc_id={doc.doc_id} />
        </Row>,
        <Row>
            <p>{moment(publish_date).format("MMMM Do YYYY")} </p>
        </Row>,
        <Row>
            <p>{authors}</p>
        </Row>,
        <img src={img_url} alt="top_image"/>,
        <Row>
             <div>{HTMLReactParser(doc.body)}</div>
        </Row>
       
    ]
    
    return(
        <Container>
            <div id="wrapper">
                {docData}

                <Row>
                    <NoteList room={room} />
                </Row>

            </div>
        </Container>
    )
}

