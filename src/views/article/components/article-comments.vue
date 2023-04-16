<template>
    <div class="articleCommentsContainer">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <!-- <articleItem></articleItem> -->
            <van-cell v-for="item in list" :key="item.aut_id" :title="item.content" />
        </van-list>
    </div>
</template>

<script>
import { getCommentList } from '@/api/comment';
import  articleItem from '@/components/articleItem'

export default {
    name:'articleComments',
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            offset:null
        };
    },
    props:{
        articleId:{
            type:[Number,String,Object],
            required:true
        }
    },
    components:{
        articleItem
    },
    methods: {
        async onLoad() {
            // 异步更新数据
            try {
                const res = await getCommentList({
                    type:'a',
                    source:this.articleId,	//文章的源 ID
                    offset:this.offset,
                    limit:null
                })
                this.list = res.data.results
                console.log(res.data.results)
            } catch (error) {
                return console.log(error)
            }
        }
    },
}
</script>

<style>

</style>