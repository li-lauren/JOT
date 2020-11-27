const Dashboard = () => {

    return(
        
           
        <Container>
            <Row >
                <Col md={3} className="d-flex align-items-center">
                    <h1 id="dashboard-h">
                        {`${localStorage.getItem('fname')}'s`} Jot</h1>
                    <h1 id="dashboard-h2">Dashboard</h1>
                </Col>
                <Col md={8}>
                    <DocList />
                    <InvitationList />

                    <br/>
                    Doc Search
                    <DocSearch />
                </Col>
                <Col md={1}>
                <i class="material-icons md-36">
                    person
                </i>
                <br/>
                <span className="material-icons md-36">
                    search
                </span>
                <br/>
                <span class="material-icons md-36">
                    post_add
                </span>


                </Col>

            </Row>
            
            
            
        
           
        </Container>

    
    )

}