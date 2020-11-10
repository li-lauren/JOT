const NoteList = () => {
    const [noteLog, setNoteLog] = React.useState([]);

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

        getNotes((error, data) => {
            if (error) {
                return "Error getting notes"
            }
            console.log(`Data: ${data}`)
            console.log(`prevNoteLog: ${noteLog}`)

            setNoteLog(prevNoteLog => [data, ...prevNoteLog])
        });

    
    }, []); //may have to be room

    return (
        <div>
             <h3>Notes</h3>
            { noteLog.map((note, i) => <p key={i}>{note.body}</p>)}
        </div>
       
    )
}