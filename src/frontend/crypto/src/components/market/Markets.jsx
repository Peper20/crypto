import { useState } from 'react'

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

const coins = [
    {
        sym: 'BTC',
        name: 'Bitcoin',
        price: '4231',
        change: '54%',
        volume: '30102',
        cap: '8914231',
    },
    {
        sym: 'ETH',
        name: 'Ethereum',
        price: '4231',
        change: '54%',
        volume: '30102',
        cap: '8914231',
    },
    {
        sym: 'USDT',
        name: 'Tether',
        price: '4231',
        change: '54%',
        volume: '30102',
        cap: '8914231',
    },
]

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
            {/* <Coin sym={'BTC'} name={'Bitcoin'} price={4231} change={'54%'} volume={30102} cap={8914231}></Coin> */}
            {coins.map((coin) => <Coin sym={coin.sym} name={coin.name} price={coin.price} change={coin.change} volume={coin.volume} cap={coin.cap}></Coin>)}
        </div>
    )
}

function Coin({sym, name, price, change, volume, cap}){
    const [always, setAlways] = useState('')

    function OnStarClick(e){
        e.stopPropagation()
        if (!always){
            setAlways('star-always')
        } else{
            setAlways('')
        }
    }
    return (
        <Row className='pt-3 pb-3 my-hover br-small rounded'>
            <Col xs={3} className='fw-bold'>
                <Row>
                    <Col xs={1} onClick={OnStarClick}>
                        <svg className={'star' + always} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{width: '1.2em', marginBottom: '0.3em', filter: 'invert(67%) sepia(62%) saturate(1205%) hue-rotate(2deg) brightness(106%) contrast(91%)'}}><path d="m76.975 95.258a3.856 3.856 0 0 1 -1.79-.442l-25.185-13.24-25.181 13.24a3.854 3.854 0 0 1 -5.589-4.062l4.808-28.043-20.375-19.858a3.852 3.852 0 0 1 2.688-6.61h27.617l12.486-29.372c1.214-2.838 5.879-2.838 7.093 0l12.486 29.372h27.616a3.853 3.853 0 0 1 2.689 6.61l-20.375 19.858 4.808 28.043a3.859 3.859 0 0 1 -3.8 4.5zm-26.975-21.885a3.826 3.826 0 0 1 1.794.441l20.066 10.551-3.831-22.346a3.854 3.854 0 0 1 1.109-3.41l15.043-14.663h-20.7a3.858 3.858 0 0 1 -3.541-2.346l-9.94-23.375-9.939 23.375a3.858 3.858 0 0 1 -3.545 2.342h-20.696l15.044 14.667a3.856 3.856 0 0 1 1.108 3.41l-3.831 22.346 20.066-10.551a3.825 3.825 0 0 1 1.793-.441z"/></svg>
                    </Col>
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