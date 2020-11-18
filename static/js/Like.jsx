const Like = () => {
    const [liked, setLiked] = useState(True)

    const like = () => {

    }

    const unlike = () => {
        
    }

    return(
        <div>
            { liked ? 
                <Button onClick={unlike}>
                    <i class="fas fa-heart"></i>
                </Button> :
                <Button onClick={like}>
                    <i class="far fa-heart"></i>
                </Button>
            }
        </div>
        
    )
}