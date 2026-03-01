import { useState } from 'react'
import './App.css'
import Menubar from './Components/Menubar/Menubar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Explore from './Pages/Explore/Explore'
import ManageCategory from './Pages/ManageCategory/ManageCategory'
import ManageItem from './Pages/ManageItems/ManageItem'
import ManageUser from './Pages/ManageUser/ManageUser'
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login/Login'

function App() {

  const location = useLocation();

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />

        {location.pathname !== "/login" && <Menubar />}
        
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/categories' element={<ManageCategory />} />
          <Route path='/items' element={<ManageItem />} />
          <Route path='/users' element={<ManageUser />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </div>

    </>
  )
}

export default App
