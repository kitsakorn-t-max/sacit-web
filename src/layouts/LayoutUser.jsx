import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'

const LayoutUser = () => {
    return (
        /* บังคับให้หน้าจอหลักสูงพอดีจอและห้าม Scroll ที่ตัวบอดี้ */
        <div className='flex flex-col h-screen overflow-hidden bg-white'>
            
            <MainNav />

            {/* ส่วนนี้จะกินพื้นที่ที่เหลือจาก Navbar 
                และจะเป็นจุดเดียวที่ยอมให้ Scroll (overflow-y-auto)
            */}
            <main className='flex-1 overflow-y-auto'>
                <Outlet />
            </main>

        </div>
    )
}

export default LayoutUser