const getPos = (cb) => {
    if (!socket) {
        console.log('NO SOCKET')
        return true;
    }
    // console.log('HERE in getPOS')
    socket.on('fin_pos', data => {
        console.log('New pos data received');
        console.log(data)
        return cb(null, data)
    })
}


const Note = ({note, room}) => {
    const { width, height } = updateWindowDim()
    const [pos, setPos] = React.useState(
        { x: note.x_pos * width , y: note.y_pos * height })
    const note_id = note.note_id
    
    React.useEffect(() => {
        getPos((error, data) => {
            if (error) {
                return "Error getting note position"
            }
            console.log(`Data: ${data.x} ${data.y}`)
            
            if (note_id == data.note_id) {
                console.log(`Matching note ids: ${note_id} and ${data.note_id} `)
                const normX = data.x * width
                const normY = data.y * height
                console.log({ normX, normY })
                setPos({ x: normX, y: normY })
            }
            
        });
    })

    const trackPos = (data) => {
        setPos({x: data.x, y: data.y})
        // socket.emit('receive_position', { 'x': data.x, 'y': data.y })
    }

    const updatePos = (data) => {
        setPos({x: data.x, y: data.y})
        console.log(`NOTE ID ${note_id}`)
        socket.emit('fin_pos', { 
            'x': data.x / width, 
            'y': data.y / height, 
            'note_id': note_id, 
            'room': room })
    }

    return(
        <ReactDraggable
            // defaultPosition={{x: pos.x, y: pos.y}}
            axis="none"
            position={{x: pos.x, y: pos.y}}
            onDrag={(e, data) => trackPos(data)}
            onStop={(e, data) => updatePos(data)}
        >
            <Button id="note" onClick={()=>console.log(note_id)}>
                <span>{note.note_id}:</span>
                <br/>
                {note.body}
                <br/>
                {/* {`x: ${pos.x.toFixed(0)}, y: ${pos.y.toFixed(0)}`} */}
                {`x: ${pos.x}, y: ${pos.y}`}
            </Button>

        </ReactDraggable>
        
    )
}