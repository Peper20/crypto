import Container from 'react-bootstrap/Container';


import {Header, active_enum} from '../common/MyHeader.jsx'
import { Markets } from './Markets.jsx';




export default function MarketsPage() {
    return (
        <>
            <Header active={active_enum.markets}></Header>
            <Container className='text-light' data-bs-theme="dark">
                <Markets></Markets>
            </Container>
            
        </>
    )
}