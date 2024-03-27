import {axiosInstance} from "./axios-http-client";

class DonateService {

    donateTransact(transaction) {
        return axiosInstance.patch('http://localhost:8090/payment/transaction',transaction);
    }
    addCommentt(commentt) {
        return axiosInstance.post('http://localhost:8090/comment',commentt)
    }
}

export default new DonateService();