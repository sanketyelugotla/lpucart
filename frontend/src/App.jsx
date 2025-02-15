import { useContext, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import NavBar from './assets/components/NavBar/NavBar'
import HoverMainDiv from './assets/Hooks/HoverDiv/HoverMainDiv'
import { loginContext } from './assets/Hooks/ContextProvider/ContextProvider'
import Home from './assets/components/Home/Home'
import Main from './assets/components/Home/Main'
import Cart from './assets/components/cart/Cart'
import './App.css'

function App() {
    const { isLoginOpen } = useContext(loginContext);
    return (
        <HoverMainDiv isLoginOpen={isLoginOpen}>
            <NavBar />
            <div className='full_main'>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </HoverMainDiv>
    )
}

export default App
