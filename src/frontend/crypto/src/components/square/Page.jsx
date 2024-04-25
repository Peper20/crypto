import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Image from 'react-bootstrap/Image';


import {Header, active_enum} from '../common/MyHeader.jsx'
import some1 from '../../assets/some1.png'


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
                                <Row>
                                    <Col xs={8}>                            
                                        <Post></Post>
                                    </Col>
                                    <Col>
                                        <Recs></Recs>
                                    </Col>
                                </Row>
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

function Recs(){
    return (
        <div className='p-3 m-1 border rounded' style={{border: 'solid #212529'}}>
            <h4>Популярные статьи</h4>
            <div className='mt-2'>
                Криптоиндустрии грозит крупнейший предлагаемый штраф за продажу...
            </div>
            <div className='mt-2'>
                Экосистема Arbitrum DEX Camelot запускается на XAI
            </div>
            <div className='mt-2'>
                Половинное сокращение биткойнов вызывает рост транзакций и комиссий за газ
            </div>
            <div className='mt-2'>
                Майкл Сэйлор нарушает молчание о цене биткойнов в связи с халвингом
            </div>
        </div>
    )
}


function Post(){
    return (
        <div className='p-3 m-1 rounded' style={{background: '#212529'}}>
            <h4>Комиссии за транзакции в биткойнах резко упали после сокращения вдвое</h4>
            <div>
            Биткойн BTC начал неделю стабильно, перейдя из рук в руки выше 65 800 долларов, поскольку комиссии за транзакции значительно снизились после сокращения вдвое.
            <br /><br />
            Данные Mempool.space показывают, что транзакции со средним приоритетом теперь стоят 8,48 долларов, а транзакции с высоким приоритетом — 9,32 доллара.
            <br /><br />
            <Image src={some1} alt="" fluid />
            <br /><br />
            Первоначально после сокращения вдвое эти комиссии выросли до более чем 146 долларов США за транзакцию со средним приоритетом и 170 долларов США за транзакцию с высоким приоритетом.

            <br /><br />
Индекс хэш-цены, показатель, созданный Luxor для количественной оценки того, сколько майнер может рассчитывать заработать на определенном количестве хэшрейта, также упал со 182,98 доллара за хэш/день до 81 доллара, что ниже уровня, который был до половины.
            <br /><br />
Хотя майнеры биткойнов ожидали, что сокращение вдвое приведет к значительному сокращению доходов, введение протокола Runes Кейси Родармора, предназначенного для создания взаимозаменяемых токенов на биткойнах, который был запущен в два раза, должно было стать противоядием от этого, учитывая уровень активности, который он совершил. создаст он-чейн.
<br /><br />
Вместо этого, по данным Magic Eden, в первые дни после события минимальные цены на коллекцию Runestone NFT упали почти на 50% за последние 24 часа с минимальной ценой почти 0,037 BTC, в то время как порядковые коллекции, такие как Bitcoin Pullets и NodeMonkes, согласно данным CoinGecko, выросли на 11% и 8% соответственно.
<br /><br />
Следует отметить, что эти порядковые коллекции также приносят значительные комиссии за транзакции, но, похоже, не являются тем же источником дохода, каким многие надеялись, что Руны.            </div>
        </div>
    )
}