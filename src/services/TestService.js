import {axiosInstance} from "./axios-http-client";

class TestService {

    getAllPosts() {
        return axiosInstance.get('http://localhost:8090/AllPosts');
    }
}

export default new TestService();