import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App