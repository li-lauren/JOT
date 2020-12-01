const Dashboard = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [showAddDoc, setShowAddDoc] = useState(false)
    const [showInvites, setShowInvites] = useState(false)
    const [showDocList, setShowDocList] = useState(false)
    const [showD3, setShowD3] = useState(true)
    const [showMenu, setShowMenu] = useState(false)

    const fname = localStorage.getItem("fname")

    const history = useHistory()

    const handleMyProfile = () => {
        history.push('/myProfile')
    }
    
    const handleSearch = () => {
        setShowSearch(!showSearch)
        setShowAddDoc(false)
        setShowInvites(false)
        setShowDocList(false)
        setShowD3(false)
    }

    const handleAddDoc = () => {
        setShowSearch(false)
        setShowAddDoc(!showAddDoc)
        setShowInvites(false)
        setShowDocList(false)
        setShowD3(false)
    }

    const handleInvites = () => {
        setShowSearch(false)
        setShowAddDoc(false)
        setShowInvites(!showInvites)
        setShowDocList(false)
        setShowD3(false)
    }

    const handleDocList = () => {
        setShowSearch(false)
        setShowAddDoc(false)
        setShowInvites(false)
        setShowDocList(!showDocList)
        setShowD3(false)
    }


    return(
        
        <div>
            <h1 id="dashboard-h">EXPLORER</h1>
            
            {showD3 ? <D3Dash /> : ''}

            <a href="#menu" id="hamburger">
                <span 
                    className="material-icons md-48"
                    style={{color:"whitesmoke"}}
                    // onClick={() => setShowMenu(!showMenu)}
                >
                    south
                </span>

            </a>
                
            <br/>
            <br/>

            
            <section id="menu">
                <Row>
                    <Col>
                        <p 
                            onClick={handleMyProfile}
                        >
                            {`${fname}/Profile`}
                        </p>
                    </Col>
                    
                    <Col>
                        <span
                            onClick={handleSearch}
                        >
                            Search
                        </span>
                    </Col>
                    
                    <Col>
                        <span 
                            onClick={handleAddDoc}>
                            Add an Article
                        </span>
                    </Col>

                    <Col>
                        <span
                            onClick={handleInvites}
                        >
                            Invites
                        </span>
                    </Col>

                    <Col>
                        <div onClick={handleDocList}>
                            Article List
                        </div>
                    </Col>

                </Row>
    
            </section> 
            <br/>
            <Row>
                {showSearch ? <DocSearch /> : ''}
                {showInvites ? <InvitationList /> : ''}
                {showDocList ? <DocList showAddDoc={showAddDoc} /> : ''}
            </Row>
                
                
            
            
            
        </div>
        

    
    )

}

{/* <Container>
    <Row >
        <Col md={2} className="d-flex align-items-center">
            <h1 id="dashboard-h">
                {`${localStorage.getItem('fname')}'s`} Jot</h1>
            <h1 id="dashboard-h2">Dashboard</h1>
        </Col>
        <Col md={9}>
            {showSearch ? <DocSearch /> : ''}
            {showInvites ? <InvitationList /> : ''}
            {showDocList ? <DocList showAddDoc={showAddDoc} /> : ''}
            {showD3 ? <D3Dash /> : ''}
            
        </Col>
        <Col md={1}>
            <span 
                className="material-icons md-48"
                onClick={() => setShowMenu(!showMenu)}
            >
                menu
            </span>
            {showMenu ? 
                <div>
                    <i 
                        className="material-icons md-36"
                        onClick={handleMyProfile}
                    >
                        person
                    </i>
                    <br/>
                    <span 
                        className="material-icons md-36" 
                        onClick={handleSearch}
                    >
                        search
                    </span>
                    <br/>
                    <span 
                        className="material-icons md-36"
                        onClick={handleAddDoc}>
                        post_add
                    </span>
                    <span 
                        className="material-icons md-36"
                        onClick={handleInvites}
                    >
                        how_to_reg
                    </span>
                    <div onClick={handleDocList}>
                        Article List
                    </div>
                    <div onClick={() => setShowD3(!showD3)}>
                        Article Explorer
                    </div>

                </div> : ''
                
                
            }


        </Col>

    </Row>
    
    
    


</Container> */}
