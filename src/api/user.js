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

// 获取文章列表
export const getChannelsList = () => {
    return request({
        url:'/v1_0/channels',
        method:'get'
    })
}

// 获取文章新闻推荐
export const getArticleList = params => {
    return request({
        url:'/v1_0/articles',
        method:'get',
        params
    })
}