import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBarLayout from './Layout/NavBarLayout'
import RideBook from './Pages/Home/RideBook'
import BookForm from './Pages/Home/BookForm'
import BecomeDriver from './Pages/Home/BecomeDriver'
import LoginPage from './Pages/Home/LoginPage'
import AdminHome from './Pages/Admin/AdminHome'
import DriverHome from './Pages/Driver/DriverHome'
import SelectCategory from './Pages/Home/SelectCategory'

function App() {
  return (
    //t
   <Routes>
    <Route path='/' element ={<NavBarLayout/>}/>
    <Route path='/ride' element ={<RideBook/>}/>bookform
    <Route path='/bookform' element ={<BookForm/>}/>
    <Route path='/driver' element ={<SelectCategory/>}/>
    <Route path='/login' element ={<LoginPage/>}/>
    <Route path='/driverdashboard/*' element ={<DriverHome/>}/>
    <Route path='/adminpage/*' element ={<AdminHome/>}/>
    <Route path='/becomedriver' element ={<BecomeDriver/>}/>
    
   </Routes>
  )
}

export default App