import {axiosInstance} from "./axios-http-client";

class DonorLoginService {

    loginDonor(post) {
        return axiosInstance.post('http://localhost:8090/donor/login',post);
    }
}

export default new DonorLoginService();