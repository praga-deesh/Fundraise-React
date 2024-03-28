import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import donorService from '../services/DonorService';

function DonorProfile() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    newName: '',
    newPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const fetchDonorData = async () => {
        donorService.viewDonorById(storedUser.id)
        .then((resp) => {
            console.log(resp);
            setUser( user => ({
                ...user,
                name : resp.data.name,
                email : resp.data.email,
            }))
            
        })
        .catch((err) =>{
            console.log(err);
        })
    };

    fetchDonorData();
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

    try {
      await donorService.updateDonorNameById(user.id, user.newName);
      setUser((prevUser) => ({
        ...prevUser,
        name: user.newName,
        newName: '',
      }));
      alert('Name updated successfully');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      await donorService.updateDonorPasswordById(user.id, user.newPassword);
      setUser((prevUser) => ({
        ...prevUser,
        newPassword: '',
      }));
      alert('Password updated successfully');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await donorService.deleteDonorById(user.id);
      sessionStorage.clear();
      alert('Account deleted successfully');
      navigate('/login');
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
      <h1 className="Heading">Donor Profile</h1>
      <hr />
      <div className="detail">
        <h2>Name: {user.name}</h2>
        <h2>Email: {user.email}</h2>
      </div>
      <form onSubmit={handleUpdateName}>
        <label>
          New Name:
          <input
          className='form-control'
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
          New Password:
          <input
            type="password"
            name="newPassword"
            className='form-control'
            value={user.newPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Password</button>
      </form>
      <div className="button-container">
        <button onClick={handleDeleteAccount} className="delete-account">
          Delete Account
        </button>
        <button onClick={handleLogout} className="logbutton">
          Logout
        </button>
      </div>
    </div>
  );
}

export default DonorProfile;