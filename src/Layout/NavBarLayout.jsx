import React from 'react'
import Header from '../components/Header'
import Home from '../Pages/Home/Home'
import { Outlet } from 'react-router-dom'
import Page2 from '../Pages/Home/Page2'
import About from '../Pages/Home/About'
import Contact from '../Pages/Home/Contact'


function NavBarLayout() {
  return (
    <div className='min-h-screen relative'>
    <Header/>
    <Home/>
    <Page2/>
    <About/>
    <Outlet/>
    <Contact/>
    </div>

  )
}

export default NavBarLayout