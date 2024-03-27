import React, { useEffect, useState } from 'react';
import PostService from '../services/PostService';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const postService = new PostService();

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
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
          try {
            await postService.deletePostById(postId);
            setPosts(posts.filter(post => post.id !== postId));
          } catch (error) {
            console.error('Error deleting post:', error);
          }
        }
      };
  return (
    <div className="post-grid" style={{height: "97.5vh",overflow:"scroll"}}>
      {posts.map(post => (
        <div key={post.id} className="post-box">
          {/* Render post details */}
          <h4>{post.title}</h4>
          <p><strong>Category:</strong> {post.category}</p>
          <p><strong>Start Date:</strong> {post.startDate}</p>
          <p><strong>End Date:</strong> {post.endDate}</p>
          <p><strong>Amount Requested:</strong> {post.amountRequested}</p>
          <p><strong>Amount Collected:</strong> {post.amountCollected || '0'}</p>
          <p><strong>Status:</strong> {post.status}</p>
          {post.status === 'incomplete' && <button className='button-group' onClick={()=>handleDelete(post.id)}>Delete</button>}
          <button className='button-group'>View Donation Details</button>
          <button>Edit Post</button>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;