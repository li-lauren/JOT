const Dashboard = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [showAddDoc, setShowAddDoc] = useState(false)
    const [showInvites, setShowInvites] = useState(false)

    const history = useHistory()

    const handleMyProfile = () => {
        history.push('/myProfile')
    }
    
    const handleSearch = () => {
        setShowSearch(!showSearch)
        setShowAddDoc(false)
        setShowInvites(false)
    }

    const handleAddDoc = () => {
        setShowSearch(false)
        setShowAddDoc(!showAddDoc)
        setShowInvites(false)
    }

    const handleInvites = () => {
        setShowSearch(false)
        setShowAddDoc(false)
        setShowInvites(!showInvites)
    }

    return(
        
        <div>
            <D3Dash />
            <Container>
                <Row >
                    <Col md={3} className="d-flex align-items-center">
                        <h1 id="dashboard-h">
                            {`${localStorage.getItem('fname')}'s`} Jot</h1>
                        <h1 id="dashboard-h2">Dashboard</h1>
                    </Col>
                    <Col md={8}>
                        {showSearch ? <DocSearch /> : ''}
                        {showInvites ? <InvitationList /> : ''}
                        <DocList showAddDoc={showAddDoc} />
                        
                    </Col>
                    <Col md={1}>
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


                    </Col>

                </Row>
                
                
                
            
            
            </Container>

        </div>
        

    
    )

}