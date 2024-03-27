import React, { useState, useEffect } from 'react';
import PostService from '../services/PostService';
import './Post.css';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const postService = new PostService();

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

  const onCategorySelected = (category) => {
    setSelectedCategory(category);
    if (category) {
      getPostsByCategory(category); 
    } else {
      getPosts();
    }
  };

  return (
    <div className="post-container">
      <div className="button-container">
        <button className="filter-button" onClick={getPosts}>All Posts</button>
        <button className="filter-button" onClick={getPostsSortedByDate}>Recent Posts</button>
        <button className="filter-button" onClick={getIncompletePosts}>Donatable Posts</button>
        <button className="filter-button" onClick={getCompletedPosts}>Completed Donations</button>
        <select className="form-select" name="Categories" onChange={(e) => getPostsByCategory(e.target.value)}>
          <option value="">All Categories</option>
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
                post.category === 'food' ? 'assets/images/food.jpg' :
                post.category === 'medical' ? 'assets/images/medical.jpg' :
                post.category === 'education' ? 'assets/images/education2.png' :
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
            <p><strong>Status:</strong> {post.status}</p>
            {post.status === 'incomplete' && <button className='button-group'>Donate</button>}
            <button className='button-group'>View Donation Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;