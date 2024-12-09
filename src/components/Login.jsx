import React, { useState } from 'react';  
import axios from 'axios';  
import loginImg from '../assets/loginImg.png';
import { FaGoogle, FaApple } from 'react-icons/fa';

function Login() {  

  // State to store email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log('Please fill in both email and password');
      return;
    }

    const data = {
      email,
      password
    };

    try {
      const response = await axios.post('LOGIN_API_ENDPOINT', data);  // Add API endpoint for login here
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your credentials to access your account</p>
          
          <form className="space-y-4" onSubmit={onLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <a href="#" className="text-xs text-blue-600 hover:underline float-right mt-1">Forgot password?</a>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-orange-600 rounded border-gray-300" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            
            <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
              Login
            </button>
          </form>
          
        </div>
        
        {/* Right side - Image */}
        <div className="w-full md:w-1/2 h-96 md:h-auto">
          <img src={loginImg} alt="Pasta dish" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default Login;
