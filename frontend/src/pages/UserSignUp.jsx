import React , { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContextProvider'
import Home from './Home'
import axios from 'axios'
function UserSignUp() {
  const [email,setEmail] = useState('')
      const [password,setPassword] = useState('')
      const [userData,setUserData] = useState('')
      const [firstName,setFirstName] = useState('')
      const [lastName,setLastName] = useState('')
      
      const navigate = useNavigate()
      const [user,setUser] = React.useContext(userDataContext)

      const submitHandler = async (e) => {
          e.preventDefault();
          const newUser = {
            email:email,
              password:password,
              fullName:{
                firstName:firstName,
                lastName:lastName
              }
          }
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
          if(response.status==200){
             const data = response.data
             setUser(data.user)
             navigate('/home')
          }
          setEmail('')
          setPassword('')
          setFirstName('')
          setLastName('')
          console.log(email,password)
      }
  return (
    <div className='bg-gray-900 h-screen flex justify-center'>
        <div className='bg-gray-800 flex justify-center w-1/3 h-2/3 mt-10 rounded-xl'>
        <form onSubmit={ (e) => {submitHandler(e)}}>
            <h1 className='font-medium text-2xl text-white flex justify-center mt-4 p-3'>User Sign-up</h1>
            <h3 className='text-white font-semibold text-lg mt-4'>Name</h3>
            <div className='flex gap-2'>
            <input type='text'
            required
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
          }}
            placeholder='firstname' className='bg-gray-100 outline-none rounded-lg text-sm p-2 w-full'/>
            <input type='text'
           
           placeholder='lastname'
           value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
          }}
           className='bg-gray-100 outline-none rounded-lg text-sm p-2 w-full'/>
            </div>
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
            <button className='bg-green-400 text-white w-full  rounded-xl  p-3 mt-10'>Sign In</button>
            <h3 className='text-white mt-4 flex justify-center '>Already have account ? <Link to={'/login'} className='text-blue-400'>Login</Link></h3>
        </form>
        
        </div>
    </div>
  )
}

export default UserSignUp