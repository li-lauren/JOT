

const AddNote = ({room}) => {
    const [note, setNote] = React.useState('');

    const postNote = (room, note) => {
        // emit note to client
    
        if (socket) {
            console.log('posting note...')
            const elem = document.getElementById('add-note')
            const box = elem.getBoundingClientRect();
            const x = box.top + window.pageYOffset
            const y = box.left + window.pageXOffset

            socket.emit('note', {
                'note': note, 
                'room': room, 
                'x_pos': x,
                'y_pos': y
            })
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




