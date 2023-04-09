// 用户相关的 API 模块

import  request  from '@/utils/request'

export const login = data =>{
    return request({
        url:'/v1_0/authorizations',
        method:'post',
        data
    })
} 

export const sendSms = params => {
    return request({
        url:`/v1_0/sms/codes/${params}`,
        method:'get'
    })
}

export const getUserInfo = () => {
    return request({
        url:'/v1_0/user',
        method:'get'
    })
}