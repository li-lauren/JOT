

const AddNote = ({room}) => {
    const [note, setNote] = React.useState('');

    const postNote = (room, note) => {
        // emit note to client
    
        if (socket) {
            console.log('posting note...')
            socket.emit('note', { 'note': note, 'room': room})
        }
    }

    return (
        <div>
            <input 
                type="text" name="note" 
                value={note} 
                onChange={e => setNote(e.target.value)}
            />
            <button onClick={()=> postNote(room, note)}>Add Note</button>
        </div>
    )
}




