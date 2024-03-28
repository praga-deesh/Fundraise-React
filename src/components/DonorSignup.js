import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DonorSignUp() {
  const navigate = new useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    sendSignupData(formData);
  };

  const sendSignupData = async (data) => {
    try {
      const response = await fetch('http://localhost:8090/donor', {
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
      navigate('/donor-login')
      alert(" donor registration Successfull!")
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <h2> Donor Registration</h2>
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
  );
}
export default DonorSignUp; 