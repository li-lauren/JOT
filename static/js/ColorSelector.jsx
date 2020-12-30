// provide circles of different colors for users to select and customize
// note colors

const ColorSelector = ({doc_id}) => {
    const socket = useContext(SocketContext)
    const colors = ['#D29DC0', '#E7DCCA', '#9CCBC0', '#C2D6C4', '#92A0CF', '#E6C9C5' ]
    
    const assignColor = (colorOpt) => {
        console.log('emit_note_color')
        socket.emit('note_color', {'note_color' : colorOpt, 'doc_id' : doc_id})
    }

    return(
        <div>
            {colors.map(colorOpt => {
                return(
                    <div 
                        style={{backgroundColor: colorOpt}}
                        onClick={() => assignColor(colorOpt)}
                        className="color-selector"
                        key={colorOpt}
                    >
                    </div>
                ) 
            })}
        </div>   
    )
}