import Container from 'react-bootstrap/Container';


import {Header} from '../common/MyHeader.jsx'




export default function ProfilePage() {
    return (
        <>
            <Header></Header>
            <Container className='text-light' data-bs-theme="dark">
                profile
            </Container>
            
        </>
    )
}