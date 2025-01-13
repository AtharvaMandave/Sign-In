import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate(); // Call useNavigate at the top level

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
  
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during logout:', error.response?.data || error.message);
    }
  };
  
  return (
    <div>
      <button
        onClick={submitHandler}
        className="bg-red-400 p-3 rounded-xl mt-4 flex justify-end"
      >
        Log Out
      </button>
    </div>
  );
}

export default Home;
