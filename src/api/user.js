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

// 获取用户推荐列表
export const getChannelsList = () => {
    return request({
        url:'/v1_0/user/channels',
        method:'get'
    })
}

// 关注用户
export const followUser = data => {
    return request({
        url:'/v1_0/user/followings',
        method:'post',
        data
    })
}

// 取消关注用户
export const deleteFollowUser = target => {
    return request({
        url:`/v1_0/user/followings/${target}`,
        method:'delete'
    })
}

// 获取用户个人资料
export const getUserProfile = () => {
    return request({
        url:'/v1_0/user/profile',
        method:'get'
    })
}

// 更新用户头像
export const changeAvatar = data => {
    return request({
        url:'/v1_0/user/photo',
        method:'PATCH',
        data
    })
}