<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"   
            @load="onLoad"
        >
            <van-cell v-for="res in list" :key="res.art_id" :title="res.title" />
        </van-list>
    </div>
</template>

<script>
import { getSearchResults } from '@/api/search';

export default {
    name:'search-result',
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            error: false,
            page:1 // 获取请求结果页面数，每次请求成功加一
        };
    },
    props:{
        searchText:{
            required:true,
            type:String
        }
    },
    methods: {
        async onLoad() {
            // onload 异步更新数据分为四步
            // 1.获取请求数据
            try {
                const res = await getSearchResults({
                    page:this.page,
                    per_page:10,
                    q:this.searchText
                    // with_top:1
                })
                // console.log(res)
                // 错误测试
                // if(Math.random()>0.2){
                //     JSON.parse('sdsads')
                // }
                const { results } = res.data
                // // 2.把请求结果展开放到 list 数组中
                this.list.push(...results)
                // console.log(this.list)
                console.log(res)
                // 3. 加载状态结束 ,将 this.loading 设置为 false;
                this.loading = false; 
                // 4. 判断本次请求是否有数据,有就获取下一次请求的时间戳,没有则结束请求
                if(results.length){
                    this.page++
                }else{
                    this.finished = true
                }  
            } catch (error) {
                this.loading = false
                this.error = true
                return console.log(error.message)
            }
        },
    },
}
</script>

<style>

</style>