import axios from "axios";
import { toast } from "react-toastify";
const PREFIX = "http://localhost:8080/api";

const UserServiceAPI = {
    getAllCustomer: async () => {
        return axios
            .get(PREFIX + "/customers")
            .then((resp) => {
                return resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    signInUser: async (postData,navigate,url) => {
        return axios
            .post(PREFIX + "/auth/users/cart/account", postData)
            .then((resp) => {
                const login =  {
                    username: postData.email,
                    password: postData.password
                }
                axios.post(PREFIX + "/auth/login", login)
                toast.success("Tài khoản được tạo thành công");
                navigate(url + "/" + resp.data);
            })
            .catch((err) => {
                toast.error(err.response.data)
            });
    },
    signInUserReturnLogin: async (postData,navigate,url) => {
        return axios
            .post(PREFIX + "/auth/users/account", postData)
            .then((resp) => {
                toast.success("Tài khoản được tạo thành công");
                navigate(url);
            })
            .catch((err) => {
                toast.error(err.response.data)
            });
    },
    updateLocation: async (id, postData, navigate, url) => {
        return axios
            .put(PREFIX + "/carts/locations/" + id, postData)
            .then((resp) => {
                toast.success("Thêm địa chỉ thành công");
                navigate(url + "/" + id);
            })
            .catch((err) => {
               console.error("Lỗi khi gửi POST request:", err);
               navigate(`/user/address`+ "/" + id);
               toast.error("Lỗi khi gửi thông tin vị trí");
            });
    },
};
export default UserServiceAPI;
