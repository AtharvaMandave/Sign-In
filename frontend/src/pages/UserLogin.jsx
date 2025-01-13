import React, { useState,useContext } from 'react'

import { userDataContext } from '../context/UserContextProvider'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
function UserLogin() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userData,setUserData] = useState('')

    const navigate = useNavigate()
    const [user,setUser] = React.useContext(userDataContext)
    const submitHandler = async (e) => {
        e.preventDefault();
      
        const userData = {
          email,
          password,
        };
      
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      
          if (response.status === 200) {
            const data = response.data;
      
           
            localStorage.setItem('token', data.token);
      
            
            setUser(data.user);
      
      
            setEmail('');
            setPassword('');
      
        
            navigate('/home');
          }
        } catch (error) {
          console.error('Login error:', error.response?.data || error.message);
      
          alert('Login failed. Please check your email and password.');
        }
      };
      
    
  return (
    <div className='bg-gray-900 h-screen flex justify-center'>
        <div className='bg-gray-800 flex justify-center w-1/3 h-2/3 mt-10 rounded-xl'>
        <form onSubmit={ (e) => {submitHandler(e)}}>
            <h1 className='font-medium text-2xl text-white flex justify-center mt-4 p-3'>User Login</h1>
            <h3 className='text-white font-semibold text-lg mt-4'>Email</h3>
            <input type='email'
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            value={email} placeholder='example@gmail.com' className='bg-gray-100 outline-none rounded-lg text-sm p-2 w-full'/>
            <h3 className='text-white font-semibold text-lg mt-4'>Password</h3>
            <input type='password'
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            value={password} placeholder='password' className='bg-gray-100 outline-none rounded-lg text-sm p-2 w-full'/>
            <button className='bg-green-400 text-white w-full  rounded-xl  p-3 mt-10'>Login</button>
            <h3 className='text-white mt-4 flex justify-center '>Dont have account ? <Link to={'/signup'} className='text-blue-400'>Sign-up</Link></h3>
        </form>
        
        </div>
    </div>
  )
}

export default UserLogin