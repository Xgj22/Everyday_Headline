// 封装请求模块

import axios from "axios";
import store from '@/store/index'
// import JSONBig from 'json-bigint'

const request = axios.create({
    baseURL:'http://toutiao.itheima.net/',

    // 自定义后端返回的数据
    // data ：后端返回的原始数据，JSON 格式的字符串
    // transformResponse:[{
    //     function (data) {
    //         try {
    //             return JSONBig.parse(data)
    //         } catch (error) {
    //             return data
    //         }
    //     }
    // }]
})

// 请求拦截器
request.interceptors.request.use((config)=>{
    const { user } = store.state
    // // // 如果user存在并且user里面的token是有效的,将其加入到请求头中
    if(user!=null){
        if(user.token!=null){
            config.headers.Authorization = `Bearer ${user.token}`
        }
        
    }
    // 注意:这里务必返回 config 对象,否则请求就停在这里出不去
    return config
})

// 响应拦截器
request.interceptors.response.use((res) => {
    // 成功的回调函数
    return res.data
},(err)=>{
    return Promise.reject(new Error('fail'))
})

export default request