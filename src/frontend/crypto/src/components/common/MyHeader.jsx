import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';


export const active_enum = {
    markets: 1,
    trading: 2,
    square: 3,
}


function Profile(){
    function logoutHandler(event){
        
    }

    return (
        <Dropdown as={NavItem}>
            <Dropdown.Toggle className='active' as={Nav.Link}>Профиль</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/profile">Настройки</Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>Выход</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

function Navigation({active}){
    return (
        <Nav className="me-auto">
            <Nav.Link href="/markets" className={active == active_enum.markets ? 'active' : ''}>Рынки</Nav.Link>
            <Nav.Link href="/trading" className={active == active_enum.trading ? 'active' : ''}>Торговля</Nav.Link>
            <Nav.Link href="/square" className={active == active_enum.square ? 'active' : ''}>Square</Nav.Link>
        </Nav>
    )
}

export function Logo(){
    return (
        <>
            {/* <img
                src={main_logo}
                width="39"
                height="39"
                className="d-inline-block align-top"
            /> */}
            <Navbar.Brand href="/home" style={{marginLeft: '6px'}}>Crypto</Navbar.Brand>
        </>
    )
}


export function Header({active}) {
    return (
        <Navbar expand="lg" data-bs-theme="dark" className="bg-dark fw-bold mb-4">
            <Container>
                <Logo></Logo>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navigation active={active}></Navigation>
                    <Nav>
                        <Profile></Profile>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    )
}




