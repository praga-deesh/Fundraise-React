import { axiosInstance } from "./axios-http-client";
const API_URL = 'http://localhost:8090/';

class DonorService {
  viewDonorById(id) {
    return axiosInstance.get('http://localhost:8090/donor/'+id);
  }

  updateDonorNameById(id, newName) {
    return axiosInstance.patch(API_URL + `donor/${id}/name`, { newName });
  }

  updateDonorEmailById(id, newEmail) {
    return axiosInstance.patch(API_URL + `donor/${id}/email`, { newEmail });
  }

  updateDonorPasswordById(id, newPassword) {
    return axiosInstance.patch(API_URL + `donor/${id}/password`, { newPassword });
  }

  deleteDonorById(id) {
    return axiosInstance.delete(API_URL + `donor/${id}`);
  }
}

export default new DonorService();

