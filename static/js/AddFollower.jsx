const AddFollower = ({followerAdded, setFollowerAdded, socket}) => {
    const [followerEmail, setFollowerEmail] = React.useState('')

    const handleChange = e => {
        setFollowerEmail(e.target.value)
    }

    const addFollower = (e) => {
        e.preventDefault()
        console.log('Add Follower')

        if (socket) {
            console.log('inviting follower...')
            socket.emit('invite_to_follow', {'email': followerEmail})
            setFollowerEmail('')
        }
        // const reqOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type':'application/json'
        //       },
        //     body: JSON.stringify({
        //         'email': followerEmail
        //     })
        // }
        // fetch("/followers", reqOptions)
        // .then(res => res.text())
        // .then(data => {
        //     console.log(data)
        //     setFollowerAdded(!followerAdded)
        // })
    }

    return (
        <div>
            <h5>Invite Friends</h5>
            <form onSubmit={addFollower}>
                <input 
                    type="text" name="email" 
                    value={followerEmail} 
                    onChange={handleChange}
                />
                {/* <button type="submit"> + </button> */}
                <Button variant="outline-dark" type="submit" size="sm"> + </Button>
            </form>   
        </div>  
    )
}
