import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export function Markets(){
    return (
        <>
            <Tabs
                defaultActiveKey='all'
                id='market_tabs'
                className='mb-3 fw-bold'
                data-bs-theme="dark"
                // fill
            >
                <Tab eventKey='favourite' title='Избранные' className='text-light'>
                    123
                </Tab>
                <Tab eventKey='all' title='Все криптовалюты'>
                    <Coins></Coins>
                </Tab>
            </Tabs>
        </>
    )
}


function Coins(){
    return (
        <div className='p-3'>
            <Row className='text-muted'>
                    <Col xs={3}>
                        <Row>
                            <Col xs={{offset: 1}}>Название</Col>
                        </Row>
                    </Col>
                    <Col xs={1} className='text-end'>Цена</Col>
                    <Col xs={2}>Изменение</Col>
                    <Col xs={2} className=''>Объём за 24ч</Col>
                    <Col xs={2} className=''>Капитализация</Col>
                    <Col xs={2} className='text-end'>Действия</Col>
            </Row>
            <Coin sym={'BTC'} name={'Bitcoin'} price={4231} change={'54%'} volume={30102} cap={8914231}></Coin>
            <Coin sym={'BTC'} name={'Bitcoin'} price={4231} change={'54%'} volume={30102} cap={8914231}></Coin>
            <Coin sym={'BTC'} name={'Bitcoin'} price={4231} change={'54%'} volume={30102} cap={8914231}></Coin>
        </div>
    )
}

function Coin({sym, name, price, change, volume, cap}){
    return (
        <Row className='pt-3 pb-3 my-hover br-small rounded'>
            <Col xs={3} className='fw-bold'>
                <Row>
                    <Col xs={1}>*</Col>
                    <Col>
                        {sym}<span className='text-muted ms-1 fw-normal' style={{fontSize: '0.9em'}}>{name}</span>
                    </Col>
                </Row>
                
            </Col>
            <Col xs={1} className='text-end'>
                {price}
            </Col>
            <Col xs={2}>
                {change}
            </Col>
            <Col xs={2} className=''>
                {volume}
            </Col>
            <Col xs={2} className=''>
                {cap}
            </Col>
            <Col xs={2} className='text-end'>
                actions
            </Col>
        </Row>
    )
}