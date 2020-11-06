let socket;

// functions for connecting with Socket.io
const connectSocket = (room) => {
    socket = io.connect('http://0.0.0.0:5000/');
    console.log('Connecting...');
    if (socket && room) {
        socket.emit('join', room)
    }
}

const disconnectSocket = () => {
    console.log('Disconnecting...');
    if (socket) {
        socket.disconnect();
    }
}

const getNotes = (cb) => {
    if (!socket) {
        return true;
    };

    socket.on('note', note => {
        console.log('Note received');
        console.log(note)
        return cb(null, note);
    });
}

const postNote = (room, note) => {
    if (socket) {
        console.log('posting note...')
        socket.emit('note', { 'note': note, 'room': room})
    }
}


// End Socket functions


const Dashboard = ({loggedIn}) => {
    
    return(
        <div>
            <h3>Dashboard</h3>
            {loggedIn ? <DocList /> : ''}
        </div>
    )

}
const DocList = () => {
    const [docDets, setDocDets] = React.useState('')
    const [docList, setDocList] = React.useState([])
    const [sharedList, setSharedList] = React.useState([])
    const [docAdded, setDocAdded] = React.useState(false)

    const getDocList = () => {
        fetch("/docs")
        .then(res => res.json())
        .then(data => setDocList(data))
    }

    const getSharedDocList = () => {
        fetch("/followed_docs")
        .then(res => res.json())
        .then(data => setSharedList(data))
    }

    React.useEffect(() => {
        getDocList()
        getSharedDocList()
    }, [docAdded])

    const getDocDets = (doc_id, e) => {
        console.log(`doc_id: ${doc_id}`)
        e.preventDefault()
        // console.log('getDocDets')
        fetch(`/docs/${doc_id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setDocDets(data)
        })
    }

    return (
        <div>
            <h5>Doc Library</h5>
            <ul>
                {docList.map(doc => {
                    return (
                        <li key={doc.doc_id}>
                            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)}>
                                {doc.title}
                            </a>
                        </li>    
                    )               
                })}

                <h6>Followed Docs</h6>
                {sharedList.map(doc => {
                    return (
                        <li key={doc.doc_id}>
                            <a href="" key={doc.doc_id} onClick={(e)=> getDocDets(doc.doc_id, e)}>
                                {doc.title}
                            </a>
                        </li>    
                    )               
                })}
            </ul>
            <AddDoc docAdded={docAdded} setDocAdded={setDocAdded} />
            {docDets ? <Doc data={docDets}/> : ''}
        </div>
    )
}

const Doc = ({data}) => {
    // const [note, setNote] = React.useState('');
    const [noteLog, setNoteLog] = React.useState([]);

    const authors = data.authors
    const doc = data.doc
    const room = doc.doc_id
    let img_url = ''
    // console.log(data.img_urls)
    if (data.img_urls) {
        img_url = data.img_urls[0]
    }

    const getAllNotes = () => {
        fetch('/notes')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setNoteLog(data)
        })
    }
    
    React.useEffect(() => {

        if (room) {
            connectSocket(room);
            console.log(`Joined Room ${room}`)
            getAllNotes()
        }

        getNotes((error, data) => {
            if (error) {
                return "Error getting notes"
            }
            console.log(`Data: ${data}`)
            console.log(`prevNoteLog: ${noteLog}`)

            setNoteLog(prevNoteLog => [data, ...prevNoteLog])
        });

        return () => {
            disconnectSocket()
        }
    }, [room]);

    
    const docData = [
        <h1>{doc.title}</h1>, 
        <FollowerList doc_id={doc.doc_id} />,
        <p>{authors}</p>,
        <p>{doc.publish_date}</p>,
        <img src={img_url} alt="top_image"/>,
        <p>{doc.body}</p>
    ]
    
    return(
        <div>
            {docData}

            <h3>Notes</h3>
            {/* { noteLog.map((note, i) => <p key={i}>{note}</p>) } */}
            { noteLog.map((note, i) => <p key={i}>{note.body}</p>)}
            <AddNote room={room}/>
        </div>
    )
}

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


const FollowerList = ({doc_id}) => {
    const [followerAdded, setFollowerAdded] = React.useState(false)
    const [followerList, setFollowerList] = React.useState([])

    // console.log(`DOC ID: ${doc_id}`)
    React.useEffect(() => {
        getFollowers()
    }, [followerAdded, doc_id])

    const getFollowers = () => {
        fetch('/followers')
        .then(res => res.json())
        .then(data => {
            setFollowerList(data)
            // ("msg" in data) ? setFollowerList([]) : setFollowerList(data);
        })
    }

    return (
        <React.Fragment>
            <h5>Following</h5>
            {followerList.length > 0 ? (followerList.map(follower => 
                <li key={follower.user_id}>
                    {follower.fname} {follower.lname}
                </li>)) : <p>None</p>}
        <AddFollower 
            followerAdded={followerAdded}
            setFollowerAdded={setFollowerAdded} 
        />
        </React.Fragment>
    )
}

const AddFollower = ({followerAdded, setFollowerAdded}) => {
    const [followerEmail, setFollowerEmail] = React.useState('')

    const handleChange = e => {
        setFollowerEmail(e.target.value)
    }

    const addFollower = (e) => {
        e.preventDefault()
        console.log('Add Follower')

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({
                'email': followerEmail
            })
        }
        fetch("/followers", reqOptions)
        .then(res => res.text())
        .then(data => {
            console.log(data)
            setFollowerAdded(!followerAdded)
        })
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
                <button type="submit"> + </button>
            </form>   
        </div>  
    )
}

const AddDoc = ({docAdded, setDocAdded}) => {
    const [userInput, setUserInput] = React.useReducer(
        (state, newState) => ({...state, ...newState}), 
        {
            url: '', 
            tag: '',
        }
    );

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setUserInput({[name]: value});
    }

    const addDoc = (e) => {
        e.preventDefault()
        console.log('Add Doc')
        console.log(`UserInput: ${userInput}`)

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify({
                'url': userInput.url,
                'tag': userInput.tag
            })
        }
        fetch("/docs", reqOptions)
        .then(res => res.text())
        .then(data => {
            console.log('Doc added')
            console.log(data) })
        .then(
            fetch("/docs")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDocAdded(!docAdded)
            })
        )
    }

    return(
        <div>
            <h5>Add an Article</h5>
            <form onSubmit={addDoc}>
                <label>URL</label>
                <input 
                    type="text" name="url" 
                    value={userInput.url} 
                    onChange={handleChange}
                />
                <label>Tag</label>

                <button type="submit">Add</button>
            </form>   
        </div>   
    )
}










const App = () => {

    return(
        <div>
            <SignUp />
            <Login />
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));