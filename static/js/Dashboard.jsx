const Dashboard = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [showAddDoc, setShowAddDoc] = useState(false)
    const [showInvites, setShowInvites] = useState(false)
    const [showDocList, setShowDocList] = useState(false)
    const [showD3, setShowD3] = useState(true)

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
    }

    const handleAddDoc = () => {
        setShowSearch(false)
        setShowAddDoc(!showAddDoc)
        setShowInvites(false)
        setShowDocList(false)
    }

    const handleInvites = () => {
        setShowSearch(false)
        setShowAddDoc(false)
        setShowInvites(!showInvites)
        setShowDocList(false)
    }

    const handleDocList = () => {
        setShowSearch(false)
        setShowAddDoc(false)
        setShowInvites(false)
        setShowDocList(!showDocList)
    }


    return(
        
        <div>
            {showD3 ? <D3Dash /> : ''}
            <h1 id="explorer-h">explorer</h1>
                <span 
                    className="display-none material-icons-round"
                    id="expand-btn"
                >
                    south
                </span>
                <a href="#menu" id="hidden-menu-btn">menu menu</a>
                
            <br/>
            <br/>

            
            <section id="menu" name="menu">
                <Container>
                    <Row id="menu-selections">
                        <Col className="selection">
                            <span 
                                onClick={handleMyProfile}
                            >
                                {`${fname}/Profile`}
                            </span>
                        </Col>
                        
                        <Col>
                            <span onClick={handleSearch}>
                                Search
                            </span>
                        </Col>
                        
                        <Col>
                            <span onClick={handleAddDoc}>
                                Add an Article
                            </span>
                        </Col>

                        <Col>
                            <span onClick={handleInvites}>
                                Invites
                            </span>
                        </Col>

                        <Col>
                            <span onClick={handleDocList}>
                                Article List
                            </span>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        {showSearch ? <DocSearch /> : ''}
                        {showInvites ? <InvitationList /> : ''}
                        {showDocList ? <DocList /> : ''}
                        {showAddDoc ? <AddDoc /> : ''}
                    </Row>  
                </Container>
                
            </section>  
        </div>
    )
}