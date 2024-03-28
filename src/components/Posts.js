import React, { useState,useEffect } from 'react';
import PostService from '../services/PostService';
import './Post.css';
import MyPosts from './MyPosts';
import { useNavigate } from 'react-router-dom';
import foodImage from '../resources/food.jpg';
import medicalImage from '../resources/medical.jpg';
import educationImage from '../resources/education2.png';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const postService = new PostService();
  const userString = sessionStorage.getItem('user');

  const navigate = useNavigate();
    

  const getPosts = async () => {
    try {
      const { data } = await postService.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const getPostsByCategory = async (category) => {
    try {
      const { data } = await postService.getPostsByCategory(category);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts by category:', error);
    }
  };

  const getPostsSortedByDate = async () => {
    try {
      const { data } = await postService.getPostsSortedByDate();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts sorted by date:', error);
    }
  };

  const getCompletedPosts = async () => {
    try {
      const { data } = await postService.getCompletedPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching completed posts:', error);
    }
  };

  const getIncompletePosts = async () => {
    try {
      const { data } = await postService.getIncompletePosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching incomplete posts:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleViewDonationClick = (post) => {
    console.log('handlePostClick called');
    sessionStorage.setItem('post', JSON.stringify(post));
    console.log(post);
    navigate('/view-donations');
  };


  const redirectToDonorLogin = async () => {
    navigate('/donor-login');
    
  };

  const handleDonate = (post) => {
    sessionStorage.setItem("post", JSON.stringify(post));
    navigate('/donate');
  };


  if(userString)
  {
      const user = JSON.parse(userString);
      if(user.role === 'fundraiser')
      {
          return <MyPosts />
      }
      else
      {
        return (
          <div className="post-container" style={{height: "90vh",overflow:"scroll"}}>
            <div className="button-container">
              <button className="filter-button" onClick={getPosts}>All Posts</button>
              <button className="filter-button" onClick={getPostsSortedByDate}>Recent Posts</button>
              <button className="filter-button" onClick={getIncompletePosts}>Donatable Posts</button>
              <button className="filter-button" onClick={getCompletedPosts}>Completed Donations</button>
              <select className="form-select" name="Categories" onChange={(e) => getPostsByCategory(e.target.value)}>
                <option value="allcategory">All Categories</option>
                <option value="education">Education</option>
                <option value="food">Food</option>
                <option value="medical">Medical</option>
              </select>
            </div>
      
            <div className="post-grid">
              {posts.map((post) => (
                <div className="post-box" key={post.id || post._id}>
        <img
          src={
            post.category === 'food' ? foodImage :
            post.category === 'medical' ? medicalImage :
            post.category === 'education' ? educationImage :
            ''
          }
          alt={post.category + ' Donation'}
        />
                  <h4>{post.title}</h4>
                  <p><strong>Category:</strong> {post.category}</p>
                  <p><strong>Start Date:</strong> {post.startDate}</p>
                  <p><strong>End Date:</strong> {post.endDate}</p>
                  <p><strong>Amount Requested:</strong> {post.amountRequested}</p>
                  <p><strong>Amount Collected:</strong> {post.amountCollected || '0'}</p>
                  <div>
            {post.status === 'incomplete' && (
                <p style={{ color: 'red', outline: '2px solid red', padding: '2px' }}>
                    <strong>Status:</strong> {post.status}
                </p>
            )}
            {post.status === 'completed' && (
                <p style={{ color: 'green', outline: '2px solid green', padding: '2px' }}>
                    <strong>Status:</strong> {post.status}
                </p>
            )}
        </div>
                  {post.status === 'incomplete' && new Date()<new Date(post.endDate) && <button className='button-group' onClick={() => handleDonate(post)}>Donate</button>}
                  <button className='button-group' onClick={() => handleViewDonationClick(post)}>View Donation Details</button>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
    else
    {
  return (
    <div className="post-container" style={{height: "90vh",overflow:"scroll"}}>
      <div className="button-container">
        <button className="filter-button" onClick={getPosts}>All Posts</button>
        <button className="filter-button" onClick={getPostsSortedByDate}>Recent Posts</button>
        <button className="filter-button" onClick={getIncompletePosts}>Donatable Posts</button>
        <button className="filter-button" onClick={getCompletedPosts}>Completed Donations</button>
        <select className="form-select" name="Categories" onChange={(e) => getPostsByCategory(e.target.value)}>
          <option value="allcategory">All Categories</option>
          <option value="education">Education</option>
          <option value="food">Food</option>
          <option value="medical">Medical</option>
        </select>
      </div>

      <div className="post-grid" >
        {posts.map((post) => (
          <div className="post-box" key={post.id || post._id}>
        <img
          src={
            post.category === 'food' ? foodImage :
            post.category === 'medical' ? medicalImage :
            post.category === 'education' ? educationImage :
            ''
          }
          alt={post.category + ' Donation'}
        />
            <h4>{post.title}</h4>
            <p><strong>Category:</strong> {post.category}</p>
            <p><strong>Start Date:</strong> {post.startDate}</p>
            <p><strong>End Date:</strong> {post.endDate}</p>
            <p><strong>Amount Requested:</strong> {post.amountRequested}</p>
            <p><strong>Amount Collected:</strong> {post.amountCollected || '0'}</p>
            <div>
            {post.status === 'incomplete' && (
                <p style={{ color: 'red', outline: '2px solid red', padding: '2px' }}>
                    <strong>Status:</strong> {post.status}
                </p>
            )}
            {post.status === 'completed' && (
                <p style={{ color: 'green', outline: '2px solid green', padding: '2px' }}>
                    <strong>Status:</strong> {post.status}
                </p>
            )}
        </div>
            {post.status === 'incomplete' && new Date()<new Date(post.endDate) && <button className='button-group' onClick={redirectToDonorLogin} >Donate</button>}
            <button className='button-group' onClick={() => handleViewDonationClick(post)}>View Donation Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};
}

export default Posts;