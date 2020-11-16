// const getNotes = (cb) => {
//     if (!socket) {
//         console.log('NO SOCKET')
//         return true;
//     };

//     socket.on('note', note => {
//         console.log('Note received');
//         console.log(note)
//         return cb(null, note);
//     });
// }

const NoteList = ({room, socket}) => {
    const [noteLog, setNoteLog] = React.useState([]);
    const [noteAdded, setNoteAdded] = React.useState(null);

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
        if (!socket) {
            console.log('NO SOCKET');
        } else {
            socket.on('note', note => {
                setNoteAdded(note)
            })
        }    
    })

    React.useEffect(() => {

        // getNotes((error, data) => {
        //     if (error) {
        //         return "Error getting notes"
        //     }
        //     console.log(`Data: ${data}`)
        //     console.log(`prevNoteLog: ${noteLog}`)

        //     setNoteLog(prevNoteLog => [data, ...prevNoteLog])
        // });
        

        setNoteLog(prevNoteLog => [noteAdded, ...prevNoteLog])
        if (noteAdded) {
            console.log(noteAdded.x_pos)
            console.log(noteAdded.y_pos)
        }
    
    }, [noteAdded]); //may have to be room

    // const notes = (noteLog.map(note => 
    //     <Note key={note.note_id} note={note} room={room} />))

    console.log(`NOTELOG: ${noteLog}`)
    return (
        <div>
            
            <div id="note-list">
                { noteLog.map(note => {
                    if (note) {
                        return <Note 
                                key={note.note_id} 
                                note={note} room={room}
                                socket={socket} /> 
                    }
                }) }
            </div>
            
           
            <AddNote room={room} socket={socket}/>
        </div>
       
    )
}