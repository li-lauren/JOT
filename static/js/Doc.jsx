const Doc = () => {
    const location = useLocation()
    const data = location.state.params
    console.log(`data: ${data.doc}`)
    const authors = data.authors
    const doc = data.doc
    const room = doc.doc_id
    const publish_date = new Date(doc.publish_date)

    const [joinMsg, setJoinMsg] = useState('')
    const [show, setShow] = useState(false)
    const socket = useContext(SocketContext)

    
    let img_url = ''

    if (data.img_urls) {
        img_url = data.img_urls[0]
    }
    console.log(socket)
    
    useEffect(() => {

        if (socket && room) {
            socket.emit('join', room)
            console.log('joining room')
            console.log(`Joined Room ${room}`)
        };

        return () => {
            // disconnectSocket()
            socket.emit('leave', room)
            console.log('leaving room')
        }
    }, [room]);

    useEffect(() => {
        if (!socket) { 
            console.log('NO SOCKET') 
        } else {
            socket.on('join_msg', msg => {
                setJoinMsg(msg)
                setShow(true)
                console.log(msg)

                setTimeout(() => {
                    setShow(false)
                    setJoinMsg('')
                }, 3000)
            })
        }
    })
    
    const colors = ['#D29DC0', '#E7DCCA', '#9CCBC0', '#C2D6C4', '#92A0CF', '#E6C9C5' ]
    const colorSelectors = colors.map(colorOpt => {
        return(
            <div 
                style={{backgroundColor: colorOpt}}
                onClick={() => assignColor(colorOpt)}
                className="color-selector"
                key={colorOpt}
            >
            </div>
        ) 
    })
    
    const docData = [
         <Row>{colorSelectors}</Row>,
        <Row>
            <h1>{doc.title}</h1>
        </Row>, 
        <Row>
            <FollowerList doc_id={doc.doc_id} socket={socket} />
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

    const assignColor = (colorOpt) => {
        socket.emit('note_color', {'note_color' : colorOpt})
    }

   
    
    return(
        <Container>
            <Alert id="joinMsg" show={show} variant="info">
                {joinMsg}
            </Alert>
            
            <div id="wrapper">
                
                {docData}

                <Row>
                    <NoteList room={room} socket={socket}/>
                </Row>

            </div>
        </Container>
    )
}

