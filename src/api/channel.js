// 频道相关的 API
import request from "@/utils/request";

export const getAllchannelsList = () =>{
    return request({
        url:'/v1_0/channels',
        method:'get'
    })
}

// 设置用户频道，新增
export const addUserChannel = data =>{
    return request({
        url:'/v1_0/user/channels',
        method:'put',
        data
    })
}

// 删除指定用户频道
export const deleteUserChannel = target => {
    return request({
        url:`/v1_0/user/channels/${target}`,
        method:'delete'
    })
}