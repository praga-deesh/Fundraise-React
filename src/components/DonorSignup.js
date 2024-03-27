import React, { useState } from 'react';
import './DonorSignup.css';


function DonorSignUp() {
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
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div class="container">
    <form onSubmit={handleSubmit} class="form-group">
    <h2> Donor Registration</h2>
    <label htmlFor="name" class="col-form-label-lg">Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        class="form-control"
      /><br></br>
      <label htmlFor="email" class="col-form-label-lg">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        class="form-control"
      /><br></br>
      <label htmlFor="password" class="col-form-label-lg">Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        class="form-control"
      /><br></br>
      <button type="submit" class="btn btn-success">Sign Up</button>
    </form>
    </div>
  );
}
export default DonorSignUp; 