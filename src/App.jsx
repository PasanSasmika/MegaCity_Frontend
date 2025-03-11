import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RideBook from './Pages/Home/RideBook'
import BookForm from './Pages/Home/BookForm'
import BecomeDriver from './Pages/Home/BecomeDriver'
import LoginPage from './Pages/Home/LoginPage'
import AdminHome from './Pages/Admin/AdminHome'
import DriverHome from './Pages/Driver/DriverHome'
import { Toaster } from 'react-hot-toast'
import CustomerHome from './Pages/Home/CustomerHome'
import Error from './components/Error'

function App() {
  return (
  <>
   <Toaster/>
   <Routes>
    <Route path='/' element ={<CustomerHome/>}/>
    <Route path='/ride' element ={<RideBook/>}/>bookform
    <Route path='/bookform' element ={<BookForm/>}/>
    <Route path='/driver' element ={<BecomeDriver/>}/>
    <Route path='/login' element ={<LoginPage/>}/>
    <Route path='/driverdashboard/*' element ={<DriverHome/>}/>
    <Route path='/adminpage/*' element ={<AdminHome/>}/>
    <Route path="*" element={<Error />} />

   </Routes>
   </>
  )
}

export default App