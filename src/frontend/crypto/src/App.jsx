import {BrowserRouter, Routes, Route} from 'react-router-dom';


import './App.css'
import MarketsPage from './components/market/Page.jsx'
import TradingPage from './components/trading/Page.jsx'
import SquarePage from './components/square/Page.jsx'
import ProfilePage from './components/profile/Page.jsx'



export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='markets' element={<MarketsPage></MarketsPage>}></Route>
                <Route path='trading' element={<TradingPage></TradingPage>}></Route>
                <Route path='square' element={<SquarePage></SquarePage>}></Route>
                <Route path='profile' element={<ProfilePage></ProfilePage>}></Route>
            </Routes>
        </BrowserRouter>
    )
}




