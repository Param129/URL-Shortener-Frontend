import React from 'react'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import NavBar from "./components/NavBar"
import { Outlet } from '@tanstack/react-router'

const App = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}


export default App