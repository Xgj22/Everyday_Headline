<template>
    <div class="articleList-container">
        <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                :success-text="refreshSuccessText"
                animation-duration="1500"
                @load="onLoad"
            >
                <articleItem :list="list"></articleItem>
                <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
            </van-list>
        </van-pull-refresh>
        
    </div>
</template>

<script>
import { getArticleList } from '@/api/user.js'
import articleItem from '@/components/articleItem'

export default {
    name:'articleList',
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            error: false,
            timestamp:null,
            isRefreshLoading: false,
            refreshSuccessText:'刷新成功'
        }
    },
    props:{
        channel:{
            type:Object,
            required:true
        }
    },
    components:{
        articleItem
    },
    methods:{
        async onLoad() {
            // onload 异步更新数据分为三步
            // 1.获取请求数据
            try {
                const res = await getArticleList({
                    channel_id:this.channel.id,
                    timestamp:this.timestamp || Date.now(),
                    // with_top:1
                })
                // console.log(res)
                // 错误测试
                // if(Math.random()>0.2){
                //     JSON.parse('sdsads')
                // }
                const { results } = res.data
                // 2.把请求结果展开放到 list 数组中
                this.list.push(...results)
                console.log(this.list)
                // 3. 加载状态结束 ,将 this.loading 设置为 false;
                this.loading = false; 
                // 4. 判断本次请求是否有数据,有就获取下一次请求的时间戳,没有则结束请求
                if(results.length){
                    this.timestamp = res.data.pre_timestamp
                }else{
                    this.finished = true
                }  
            } catch (error) {
                this.loading = false
                this.error = true
                return console.log(error.message)
            }
        },
        async onRefresh() {
            try {
                const res = await getArticleList({
                    channel_id:this.channel.id,
                    // 刷新数据时时间戳永远是当前时间
                    timestamp:Date.now(),
                    // with_top:1
                })
                // console.log(res)
                // 错误测试
                // if(Math.random()>0.2){
                //     JSON.parse('sdsads')
                // }
                const { results } = res.data
                // 2.把请求结果展开放到 list 数组中
                this.refreshSuccessText = `刷新成功,返回${results.length}条数据`
                this.list.unshift(...results)
                // 3. 加载状态结束 ,将 this.loading 设置为 false;
                this.isRefreshLoading = false; 
            } catch (error) {
                this.isRefreshLoading = false;
                this.refreshSuccessText = `刷新成功,返回${results.length}条数据`
            }
        },
  },
    
}
</script>

<style>
.articleList-container{
    /* 设置容器的高度,不同页面的内容才不会随着 body 的滚动而滚动
        vh 是 css3 的新特性,相对视口的百分比高度
     */
    height: 80vh;
    overflow-y: auto;
    padding-top: 180px;
    padding-bottom: 100px;
}
</style>