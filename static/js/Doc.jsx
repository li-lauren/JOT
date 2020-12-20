// article display with options to add notes, invite followers, and 
// customize note colors

const Doc = () => {
    const location = useLocation()
    let data = location.state.params
   
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
    
    useEffect(() => {
        window.scrollTo(0, 0) // force view to start at top of page

        localStorage.setItem('doc_id', room.toString())
        if (socket && room) {
            socket.emit('join', room)
            console.log('joining room')
            console.log(`Joined Room ${room}`)
        };

        return () => {
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
    }, [])
    
    
    
    const docData = [
         <Row key={1}>
             <ColorSelector doc_id={room}/>
         </Row>,
         <Row key={2}>
            <FollowerList doc_id={room} />
        </Row>,
        <Row key={3}>
            <TagList doc_id={room} />
        </Row>,
        <Row key={4}>
            <h1>{doc.title}</h1>
        </Row>, 
        <Row key={5}>
            <p>{doc.publish_date ? moment(publish_date).format("MMMM Do YYYY") : '' }</p>
        </Row>,
        <Row key={6}>
            <p>{authors}</p>
        </Row>,
        <Row key={7}> 
            <img className="top-image" src={img_url} alt="top_image"/>
        </Row>,
        <Row id="doc-body" key={8}>
             <div>{HTMLReactParser(doc.body)}</div>
        </Row>
       
    ]
    
    return(
        <div>
            <Navbar />
            <Container style={{'margin-top': '-50px'}}>

                {/* Alert that a user has joined the room  */}
                <Alert id="joinMsg" show={show} variant="info">
                    {joinMsg}
                </Alert>
                
                <div id="wrapper">
                    
                    {docData}

                    <Row>
                        {/* Original placeholder for notes  */}
                        <NoteList room={room} />
                    </Row>

                </div>
            </Container>
        </div>   
    )
}

