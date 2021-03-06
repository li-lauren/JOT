const NoteList = ({room}) => {
    const [noteLog, setNoteLog] = useState([]);
    const [noteAdded, setNoteAdded] = useState(null);
    const [colorChange, setColorChange] = useState(null)
    const socket = useContext(SocketContext)

    const getAllNotes = () => {
        console.log('GETTING NOTES')
        fetch(`/notes/${room}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setNoteLog(data)
        })
    }

    useEffect(() => {
        getAllNotes()
    }, [room, colorChange])

    useEffect(() => {
        let isMounted = true;
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('note', note => {
                setNoteAdded(note)
            })
            socket.on('note_color_changed', data => {
                setColorChange(data.color)
                console.log(data.color)
            })
        }    

        return () => { isMounted = false };
    }, [])

    useEffect(() => {

        setNoteLog(prevNoteLog => [noteAdded, ...prevNoteLog])
        if (noteAdded) {
            console.log(noteAdded.x_pos)
            console.log(noteAdded.y_pos)
        }
    
    }, [noteAdded]); //may have to be room

    console.log(`NOTELOG: ${noteLog}`)
    return (
        <div>
            
            <div id="note-list">
                { noteLog.map(note => {
                    if (note) {
                        return <Note 
                                key={note.note_id} 
                                note={note} room={room} noteColor={note.color}
                                socket={socket} /> 
                    }
                }) }
            </div>
            
           
            <AddNote room={room} socket={socket}/>
        </div>
       
    )
}