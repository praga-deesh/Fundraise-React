import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FundraiserProfile() {
  const [user, setUser] = useState({
    id: '', 
    name: '',
    newName: '', 
    password:'',
    newPassword:'',
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setUser({
        ...user,
        id: user.id, 
        newName: user.newName,
        newPassword:user.newPassword,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    //console.log(user);
    try {
      const url = `http://localhost:8090/fundraiser/name?id=${encodeURIComponent(user.id)}&newName=${encodeURIComponent(user.newName)}`;
      const response = await fetch(url, {
        method: 'PATCH',
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const data = await response.json();
      let user2 = {
        id:data.id,
        name:data.name,
        email:data.email,
        role:"fundraiser"
      };
      sessionStorage.setItem("user", JSON.stringify(user2));
      setUser(user2);
      alert('User name updated successfully');
      
      setUser((prevUser) => ({
        ...prevUser,
        newName: '',
      }));
      
    } catch (error) {
      console.error('Update error:', error);
    }
  };
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    //console.log(user);
    try {
      const url = `http://localhost:8090/fundraiser/password?id=${encodeURIComponent(user.id)}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { // 1
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ // 2
            password: user.newPassword, 
          }),
      });
      
      console.log("============");
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      alert('User password updated successfully');
     
      setUser((prevUser) => ({
        ...prevUser,
        newPassword: '',
      }));
      
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://localhost:8090/fundraiser', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user account');
      }

      alert('User account deleted successfully');
      sessionStorage.clear(); 
    } catch (error) {
      console.error('Deletion error:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };


  return (
    <div>
      <h1> Fundraiser Profile</h1><hr/>
      <h2>name : {user.name}</h2>
      <h2>email : {user.email}</h2>
      <h2>role : {user.role}</h2> <hr/>

      <form onSubmit={handleUpdateName}>
        <label>
          Username:
          <input
            type="text"
            name="newName"
            value={user.newName}
            onChange={handleChange}
          />
        </label>
        
        <button type="submit">Update Name</button>
      </form>
      <form onSubmit={handleUpdatePassword}>
        <label>
          Password:
          <input
            type="text"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
          />
        </label>
        
        <button type="submit">Update password</button>
      </form>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default FundraiserProfile;