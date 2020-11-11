const getNotes = (cb) => {
    if (!socket) {
        console.log('NO SOCKET')
        return true;
    };

    socket.on('note', note => {
        console.log('Note received');
        console.log(note)
        return cb(null, note);
    });
}

const NoteList = ({room}) => {
    const [noteLog, setNoteLog] = React.useState([]);
    // const [noteAdded, setNoteAdded] = React.useState(0);

    // console.log(noteAdded)

    const getAllNotes = () => {
        fetch('/notes')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setNoteLog(data)
        })
    }

    React.useEffect(() => {
        getAllNotes()
    }, [room])

    React.useEffect(() => {
        // getAllNotes()

        getNotes((error, data) => {
            if (error) {
                return "Error getting notes"
            }
            console.log(`Data: ${data}`)
            console.log(`prevNoteLog: ${noteLog}`)

            setNoteLog(prevNoteLog => [data, ...prevNoteLog])
        });

    
    }); //may have to be room

    return (
        <div>
             <h3>Notes</h3>
             { noteLog.map(note => 
                <Note key={note.note_id} note={note} room={room} />) }

             <AddNote room={room} />
        </div>
       
    )
}