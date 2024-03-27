import React, { useEffect, useState } from 'react';
import PostService from '../services/PostService';
import './MyPosts.css'
import { useNavigate } from 'react-router-dom';
import foodImage from '../resources/food.jpg';
import medicalImage from '../resources/medical.jpg';
import educationImage from '../resources/education2.png';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const postService = new PostService();
  const navigate = useNavigate();

      const userString = sessionStorage.getItem('user');
      useEffect (() => { 
      if(userString)
      {
        const user = JSON.parse(userString);
        if (user.role === 'fundraiser' ) {
            
            const fetchPosts = async () => {
              try {
                const response = await postService.getPostsByFundraiserId(user.id);
                setPosts(response.data);
              } catch (error) {
                console.error('Error fetching posts:', error);
              }
            };
            fetchPosts();
        
        }
      }
    },[]);

      const handleDelete = async (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?" + postId);
        if (confirmDelete) {
          try {
            console.log(postId);
            await postService.deletePostById(postId);
            alert("POst Deleted ...")
            
            setPosts(posts.filter(post => post.id !== postId));

          } catch (error) {
            console.error('Error deleting post:', error);
          }
        }
      };

      const redirectToCreatePost = async () => {
        navigate('/create-post');
      }

  return (
    <>
    <div className='first-div'>
    <h3>My Posts</h3>
    <button className='create-post-btn' onClick={redirectToCreatePost}> Create Post</button>
    </div>
    <div className='post-container' style={{height: "80vh",overflow:"scroll"}} >
    <div className="post-grid">
      {posts.map(post => (
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
          {post.status === 'incomplete' && <button className='button-group' onClick={()=>handleDelete(post.id)}>Delete</button>}
          <button className='button-group'>View Donation Details</button>
          <button>Edit Post</button>
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default MyPosts;