const ColorSelector = ({doc_id}) => {

    const colors = ['#D29DC0', '#E7DCCA', '#9CCBC0', '#C2D6C4', '#92A0CF', '#E6C9C5' ]
    const colorSelectors = colors.map(colorOpt => {
        return(
            <div 
                style={{backgroundColor: colorOpt}}
                onClick={() => assignColor(colorOpt)}
                className="color-selector"
                key={colorOpt}
            >
            </div>
        ) 
    })

    const assignColor = (colorOpt) => {
        socket.emit('note_color', {'note_color' : colorOpt, 'doc_id' : doc_id})
    }

    return(
        {colorSelectors}
    )
}