import React from 'react'
import Home from './Pages/Home/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import NavBarLayout from './Layout/NavBarLayout'

function App() {
  return (
   <Routes>
    <Route path='/' element ={<NavBarLayout/>}/>
   </Routes>
  )
}

export default App