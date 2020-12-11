// Component for adding a note (jot)

const AddNote = ({room}) => {
    const [note, setNote] = React.useState('');
    const socket = useContext(SocketContext);

    const postNote = e => {
        // emit note to client
        e.preventDefault()
        
        if (socket) {
            console.log('posting note...')
            const addNoteElem = document.getElementById('add-note').getBoundingClientRect()
            const noteOriginElem = document.getElementById('note-list').getBoundingClientRect()
            
            // calculate initial position of note
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
            <form onSubmit={postNote}>
                <input 
                    type="text" name="note" 
                    value={note} 
                    autoComplete="off"
                    onChange={e => setNote(e.target.value)}
                    id="add-note-input"
                    placeholder="+ Jot"
                />
                <input type="submit" style={{display: 'none'}} />
            </form>
        </div>
    )
}




