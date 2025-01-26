import React from 'react'
import Header from '../components/Header'
import Home from '../Pages/Home/Home'
import { Outlet } from 'react-router-dom'
import Page2 from '../Pages/Home/Page2'


function NavBarLayout() {
  return (
    <div className='min-h-screen relative'>
    <Header/>
    <Home/>
    <Page2/>
    <Outlet/>
    </div>

  )
}

export default NavBarLayout