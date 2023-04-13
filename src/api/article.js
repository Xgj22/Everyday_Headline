// 文章相关的 API 模块
import request from "@/utils/request";

// 获取文章新闻推荐
export const getArticleList = params => {
    return request({
        url:'/v1_0/articles',
        method:'get',
        params
    })
}