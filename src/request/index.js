import axios from 'axios';

console.log('process.env.VUE_APP_BASE_API:', process.env.VUE_APP_BASE_API)
const Axios = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
});

Axios.interceptors.response.use(
    response => {
        const res = response.data
        if (response.status != 200) {
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            if (res.code == 200) {
                return res
            } else {
                return Promise.reject(res.msg)
            }
        }
    },
    error => {
        return Promise.reject(error)
    }
)
export default Axios;