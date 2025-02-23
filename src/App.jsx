import React from 'react'
import Home from './Pages/Home/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import NavBarLayout from './Layout/NavBarLayout'
import RideBook from './Pages/Home/RideBook'
import BookForm from './Pages/Home/BookForm'
import BecomeDriver from './Pages/Home/BecomeDriver'
import LoginPage from './Pages/Home/LoginPage'

function App() {
  return (
    //t
   <Routes>
    <Route path='/' element ={<NavBarLayout/>}/>
    <Route path='/ride' element ={<RideBook/>}/>bookform
    <Route path='/bookform' element ={<BookForm/>}/>
    <Route path='/driver' element ={<BecomeDriver/>}/>
    <Route path='/login' element ={<LoginPage/>}/>
    
   </Routes>
  )
}

export default App