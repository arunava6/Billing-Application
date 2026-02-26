import { useState } from 'react'
import './App.css'
import Menubar from './Components/Menubar/Menubar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Explore from './Pages/Explore/Explore'
import ManageCategory from './Pages/ManageCategory/ManageCategory'
import ManageItem from './Pages/ManageItems/ManageItem'
import ManageUser from './Pages/ManageUser/ManageUser'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <Menubar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/explore' element={<Explore/>} />
          <Route path='/categories' element={<ManageCategory/>} />
          <Route path='/items' element={<ManageItem/>} />
          <Route path='/users' element={<ManageUser/>} />
          <Route path='/' element={<Dashboard/>} />
        </Routes>
      </div>

    </>
  )
}

export default App
