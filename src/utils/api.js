
import axios from 'axios'
import { Message } from 'element-ui'
import { router } from "../router";

// 相应拦截器
axios.interceptors.response.use(res => {
    //业务逻辑错误
    if (res.status && res.status == 200) {
        if (res.data.success) {
            return res.data;
        } else if (res.data.code == 504 || res.data.code == 404) {
            Message.error({ message: "服务器被吃了囧～～～" })
        } else if (res.data.code == 403) {
            Message.error({ message: "权限不足， 请联系管理员" })
        } else if (res.data.code == 401) {
            Message.error({ message: "尚未登陆，请登录" })
            router.replace("/")
        } else {
            Message.error({ message: "未知错误" })
        }
    } else {
        Message.error({ message: res.data.message })
    }
}, error => {

    Message.error({ message: "未知错误" })
    return;
})



let base = '';
export const postRequest = (url, param) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        params: param
    })
}
