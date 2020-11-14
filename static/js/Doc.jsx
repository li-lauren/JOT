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

// const getNotes = (cb) => {
//     if (!socket) {
//         return true;
//     };

//     socket.on('note', note => {
//         console.log('Note received');
//         console.log(note)
//         return cb(null, note);
//     });
// }

// End Socket functions


const Doc = ({data}) => {
    // const [noteLog, setNoteLog] = React.useState([]);

    const authors = data.authors
    const doc = data.doc
    const room = doc.doc_id

    console.log(doc.body)
    let img_url = ''

    if (data.img_urls) {
        img_url = data.img_urls[0]
    }

    // const getAllNotes = () => {
    //     fetch('/notes')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(`GETTING NOTES FOR DOC ${room}`)
    //         console.log(data)
    //         setNoteLog(data)
    //     })
    // }
    
    React.useEffect(() => {

        if (room) {
            connectSocket(room);
            console.log(`Joined Room ${room}`)
            // getAllNotes()
        }

        // getNotes((error, data) => {
        //     if (error) {
        //         return "Error getting notes"
        //     }
        //     console.log(`Data: ${data}`)
        //     console.log(`prevNoteLog: ${noteLog}`)

        //     setNoteLog(prevNoteLog => [data, ...prevNoteLog])
        // });

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
            <p>{authors}</p>
            <p>{doc.publish_date}</p>
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

                {/* <h3>Notes</h3> */}
                {/* { noteLog.map((note, i) => <p key={i}>{note.body}</p>)} */}
                {/* { noteLog.map(note => <Note note={note} room={room} />) } */}

                <Row>
                    <NoteList room={room} />
                </Row>

                {/* <AddNote room={room}/> */}

            </div>
        </Container>
    )
}

