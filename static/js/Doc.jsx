let socket;

// functions for connecting with Socket.io
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

const getNotes = (cb) => {
    if (!socket) {
        return true;
    };

    socket.on('note', note => {
        console.log('Note received');
        console.log(note)
        return cb(null, note);
    });
}

const postNote = (room, note) => {
    if (socket) {
        console.log('posting note...')
        socket.emit('note', { 'note': note, 'room': room})
    }
}

const getPos = (cb) => {
    if (!socket) {
        console.log('NO SOCKET')
        return true;
    }
    console.log('HERE in getPOS')
    socket.on('receive_position', data => {
        console.log('New pos data received');
        console.log(data)
        return cb(null, data)
    })
}

// End Socket functions


const Doc = ({data}) => {
    const [noteLog, setNoteLog] = React.useState([]);

    const authors = data.authors
    const doc = data.doc
    const room = doc.doc_id
    let img_url = ''

    if (data.img_urls) {
        img_url = data.img_urls[0]
    }

    const getAllNotes = () => {
        fetch('/notes')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setNoteLog(data)
        })
    }
    
    React.useEffect(() => {

        if (room) {
            connectSocket(room);
            console.log(`Joined Room ${room}`)
            getAllNotes()
        }

        getNotes((error, data) => {
            if (error) {
                return "Error getting notes"
            }
            console.log(`Data: ${data}`)
            console.log(`prevNoteLog: ${noteLog}`)

            setNoteLog(prevNoteLog => [data, ...prevNoteLog])
        });


        return () => {
            disconnectSocket()
        }
    }, [room]);

    
    const docData = [
        <h1>{doc.title}</h1>, 
        <FollowerList doc_id={doc.doc_id} />,
        <p>{authors}</p>,
        <p>{doc.publish_date}</p>,
        <img src={img_url} alt="top_image"/>,
        <p>{doc.body}</p>
    ]
    
    return(
        <div>
            {docData}

            <h3>Notes</h3>
            {/* { noteLog.map((note, i) => <p key={i}>{note.body}</p>)} */}
            { noteLog.map(note => <Note note={note} />) }

            <AddNote room={room}/>
        </div>
    )
}



const Note = ({note}) => {
    const [pos, setPos] = React.useState({ x: note.x, y: note.y })

    React.useEffect(() => {
        getPos((error, data) => {
            if (error) {
                return "Error getting note position"
            }
            console.log(`Data: ${data.x} ${data.y}`)

            setPos({ x: data.x, y: data.y })
        });
    }, [])

    const trackPos = (data) => {
        setPos({x: data.x, y: data.y})
        // socket.emit('receive_position', { 'x': data.x, 'y': data.y })
    }

    const updatePos = (data) => {
        setPos({x: data.x, y: data.y})
        socket.emit('fin_pos', { 'x': data.x, 'y': data.y })
    }

    return(
        <ReactDraggable
            key={note.note_id}
            defaultPosition={{x: 0, y: 0}}
            onDrag={(e, data) => trackPos(data)}
            onStop={(e, data) => updatePos(data)}
        >
            <div>
                {note.user_id}
                {note.body}
                {`x: ${pos.x.toFixed(0)}, y: ${pos.y.toFixed(0)}`}
            </div>

        </ReactDraggable>
        
    )
}
