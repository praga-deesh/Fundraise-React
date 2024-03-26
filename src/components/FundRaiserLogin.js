import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FundRaiserLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Update credentials state as user types in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(''); 
    try {
      const response = await fetch('http://localhost:8090/fundraiser/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
       throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      let user = {
        id:data.id,
        name:data.name,
        email:data.email,
        role:"fundraiser"
      };
      sessionStorage.setItem("user", JSON.stringify(user));
      
      alert('Login successful!');
      
      navigate('/profile');
      
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to login. Please check your username and password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default FundRaiserLogin;
