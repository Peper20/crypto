import { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container';


import {Header, active_enum} from './components/common/MyHeader.jsx'
import { Markets } from './components/market/Markets.jsx';


export default function App() {
    return (
        <>
            <Header active={active_enum.markets}></Header>
            <Container className='text-light' data-bs-theme="dark">
                <Markets></Markets>
            </Container>
            
        </>
    )
}




