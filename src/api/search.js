// 搜索相关的 API
import request from "@/utils/request";

// 获取搜索联想结果
export const getSearchSuggestion = q => {
    return request({
        url:'/v1_0/suggestion',
        method:'get',
        params:{
            q
        }
    })
}

// 获取搜索结果
export const getSearchResults = params => {
    return request({
        url:'/v1_0/search',
        method:'get',
        params
    })
}