import axios from 'axios';
import { axiosInstance } from "./axios-http-client";

const API_URL = 'http://localhost:8090/';

class PostService {
  getCompletedPosts() {
    return axiosInstance.get(API_URL + 'posts/complete');
  }

  getIncompletePosts() {
    return axiosInstance.get(API_URL + 'posts/incomplete');
  }

  getAllPosts() {
    return axiosInstance.get(API_URL + 'AllPosts');
  }

  getPostsSortedByDate() {
    return axiosInstance.get(API_URL + 'posts/newestFirst');
  }
  getPostsByCategory(category){
    return axiosInstance.get(`${API_URL}posts/${category}`);
  }
}

export default PostService;