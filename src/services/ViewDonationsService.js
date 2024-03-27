import { axiosInstance } from "./axios-http-client";

const API_URL = 'http://localhost:8090/';

class ViewDonationsService {
  viewComments(postId) {
    return axiosInstance.get(`${API_URL}comment/post/${postId}`);
  }

  viewDonations(postId) {
    return axiosInstance.get(`${API_URL}view/donations?donationPostId=${postId}`);
  }
}

export default new ViewDonationsService();