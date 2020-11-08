const AddNote = ({room}) => {
    const [note, setNote] = React.useState('');

    const getNote = e => setNote(e.target.value);

    return (
        <div>
            <input type="text" name="note" value={note} onChange={getNote}/>
            <button onClick={()=> postNote(room, note)}>Add Note</button>
        </div>
    )
}




