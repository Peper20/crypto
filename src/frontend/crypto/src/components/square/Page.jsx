import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


import {Header, active_enum} from '../common/MyHeader.jsx'



function MyNav(){
    return (
        <>
            <Tab.Container defaultActiveKey='main'>
                <Row>
                    <Col sm={3}>
                        <Nav variant="underline" className="flex-column fw-bold">
                            <Nav.Item><Nav.Link eventKey="main" className='my-nav-sq'>Главная</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="alerts" className='my-nav-sq'>Уведомления</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="profile" className='my-nav-sq'>Профиль</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="settings" className='my-nav-sq'>Настройки</Nav.Link></Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Tab.Content className='p-2'>
                        <Tab.Pane eventKey="main">
                                Основное <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo perspiciatis non, provident exercitationem distinctio id, saepe optio quibusdam asperiores cumque reiciendis enim fugit? Asperiores expedita cum ducimus nostrum labore iste.
                            </Tab.Pane>
                            <Tab.Pane eventKey="alerts">
                                Уведомления <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo perspiciatis non, provident exercitationem distinctio id, saepe optio quibusdam asperiores cumque reiciendis enim fugit? Asperiores expedita cum ducimus nostrum labore iste.
                            </Tab.Pane>
                            <Tab.Pane eventKey="profile">
                                Профиль <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo perspiciatis non, provident exercitationem distinctio id, saepe optio quibusdam asperiores cumque reiciendis enim fugit? Asperiores expedita cum ducimus nostrum labore iste.
                            </Tab.Pane>
                            <Tab.Pane eventKey="settings">
                                Настройки <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo perspiciatis non, provident exercitationem distinctio id, saepe optio quibusdam asperiores cumque reiciendis enim fugit? Asperiores expedita cum ducimus nostrum labore iste.
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default function SquarePage() {
    return (
        <>
            <Header active={active_enum.square}></Header>
            <Container className='text-light' data-bs-theme="dark">
                <MyNav></MyNav>
            </Container>            
        </>
    )
}