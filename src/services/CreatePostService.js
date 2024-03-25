import {axiosInstance} from "./axios-http-client";

class CreatePostService {

    addPost(post) {
        return axiosInstance.post('http://localhost:8090/post',post);
    }
}

export default new CreatePostService();