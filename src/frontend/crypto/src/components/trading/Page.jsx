import Container from 'react-bootstrap/Container'

import {Header, active_enum} from '../common/MyHeader.jsx'
import TradingViewWidget from './Gra.jsx'


export default function TradingPage() {
    return (
        <>
            <Header active={active_enum.trading}></Header>
            <Container className='text-light' data-bs-theme="dark">
                <TradingViewWidget></TradingViewWidget>
            </Container>            
        </>
    )
}









