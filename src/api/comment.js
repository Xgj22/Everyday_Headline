// 文章评论的 API
import request from "@/utils/request";

// 获取搜索联想结果
export const getCommentList = params => {
    return request({
        url:'/v1_0/comments',
        method:'get',
        params
    })
}