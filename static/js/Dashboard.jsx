const Dashboard = () => {

    return(
        <Container id="dashboard">
            <h3>{`${localStorage.getItem('fname')}'s`} Dashboard</h3>
            
            <DocList />
            <InvitationList />
        
            <br/>
            Doc Search
            <DocSearch />
        </Container>
    )

}