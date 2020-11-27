const { Redirect, Switch, Link, Route } = ReactRouterDOM;

const Navbar = ({loggedIn}) => {
    return(
        <Container>

       
        <nav>
            { loggedIn ? 
                <span>
                    <Link to={'/dashboard'}>Dashboard</Link>
                    <Link to={'/myProfile'}>
                        {localStorage.getItem('fname')}
                    </Link>
                </span> : 
                <Link to={'/'}>Jot</Link>
            }
            
            
        </nav>

            {/* <Navbar bg="light" variant="light">
                <Navbar.Brand as={Link} to="/">Jot</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/myProfile">
                        <span className="material-icons">
                            face
                        </span>
                    </Nav.Link>
                </Nav>
            </Navbar> */}

        </Container>
    )   
}