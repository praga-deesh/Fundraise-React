
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
  getPostsByFundraiserId(id){
    return axiosInstance.get(API_URL+'post/fundraiser/'+id);
  }
  deletePostById(id){
    return axiosInstance.delete(API_URL+'post/'+id);
  }
}

export default PostService;