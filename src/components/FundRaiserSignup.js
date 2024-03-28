import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FundRaiserLogin() {

  const navigate = new useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'll call the function to send data to backend
    sendSignupData(formData);
  };

  const sendSignupData = async (data) => {
    try {
      const response = await fetch('http://localhost:8090/fundraiser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Signup failed');
      }
  
      const responseData = await response.json();
      console.log('Signup success:', responseData);
      navigate('/fundraiser-login')
      alert(" fundraiser registration Successfull!")
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
    <h2> Fundraiser Registration</h2>
    <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className='form-control'
        value={formData.name}
        onChange={handleChange}
      /><br></br>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className='form-control'
        value={formData.email}
        onChange={handleChange}
      /><br></br>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        className='form-control'
        value={formData.password}
        onChange={handleChange}
      /><br></br>
      <button type="submit">Sign Up</button>
    </form>
    </div>
    </>
  );
}
export default FundRaiserLogin;