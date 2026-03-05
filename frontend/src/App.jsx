import { useContext, useState } from 'react'
import './App.css'
import Menubar from './Components/Menubar/Menubar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Explore from './Pages/Explore/Explore'
import ManageCategory from './Pages/ManageCategory/ManageCategory'
import ManageItem from './Pages/ManageItems/ManageItem'
import ManageUser from './Pages/ManageUser/ManageUser'
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login/Login'
import OrderHistory from './Pages/OrderHistory/OrderHistory'
import { AppContext } from './Context/AppContext'
import NotFound from './Pages/NotFound/NotFound'

function App() {

  const location = useLocation();
  const { auth } = useContext(AppContext)

  const LoginRoute = ({ element }) => {
    if (auth.token) {
      return <Navigate to="/dashboard" replace />
    }
    return element
  }

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />
    }
    return element;
  }

  const validRoutes = [
    "/",
    "/dashboard",
    "/explore",
    "/categories",
    "/items",
    "/users",
    "/orders",
  ];

  const isNotFoundPage = !validRoutes.includes(location.pathname);

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />

        {location.pathname !== "/login" && !isNotFoundPage && <Menubar />}
        
        <Routes>
          <Route
            path="/"
            element={auth.token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
          />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/explore' element={<Explore />} />

          <Route path='/categories' element={<ProtectedRoute element={<ManageCategory />} allowedRoles={["ADMIN"]} />} />
          <Route path='/items' element={<ProtectedRoute element={<ManageItem />} allowedRoles={["ADMIN"]} />} />
          <Route path='/users' element={<ProtectedRoute element={<ManageUser />} allowedRoles={["ADMIN"]} />} />

          <Route path='/login' element={<LoginRoute element={<Login />} />} />
          <Route path='/orders' element={<OrderHistory />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </>
  )
}

export default App
