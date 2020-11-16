

const AddNote = ({room, socket}) => {
    const [note, setNote] = React.useState('');

    const postNote = (room, note) => {
        // emit note to client
    
        if (socket) {
            console.log('posting note...')
            const addNoteElem = document.getElementById('add-note').getBoundingClientRect()
            const noteOriginElem = document.getElementById('note-list').getBoundingClientRect()
        
            const y = addNoteElem.top - noteOriginElem.top - 80
            const x = addNoteElem.left - noteOriginElem.left
            console.log({x, y})
            socket.emit('note', {
                'note': note, 
                'room': room, 
                'x_pos': x,
                'y_pos': y
            })
            setNote('')
        }
    }

    return (
        <div id="add-note">
            <input 
                type="text" name="note" 
                value={note} 
                onChange={e => setNote(e.target.value)}
            />
            <br/>
            <Button 
                onClick={()=> postNote(room, note)}
                variant="outline-primary"
                size="sm"
            >
                Add Note
            </Button>
        </div>
    )
}




