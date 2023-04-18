<template>
    <div class="articleCommentsContainer">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            offset="100"
        >
            <!-- <articleItem></articleItem> v-for="(item,index) in list" :key="index" :title="item.content" -->
            <commentItem :cmtlist="list"/>
        </van-list>
    </div>
</template>

<script>
import { getCommentList } from '@/api/comment';
import commentItem from './comment-item.vue';

export default {
    name:'articleComments',
    data() {
        return {
            // list 换成从父组件中传入
            // list: [],
            loading: false,
            finished: false,
            offset:null
        };
    },
    props:{
        articleId:{
            type:[Number,String,Object],
            required:true
        },
        list:{
            type:Array,
            default:() => [] //默认值为空数组
        }
    },
    components:{
        commentItem
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
                // 拿到数据把数据更新到 list 中
                this.list.push(...res.data.results)
                
                // 修改 loading 状态
                this.loading = false
                if(res.data.results.length){
                    this.offset = res.data.last_id
                }else{
                    this.finished = true
                }
                
            } catch (error) {
                return console.log(error)
            }
        }
    },
}
</script>

<style>
.articleCommentsContainer{
    height: 50vh;
    overflow-y: auto;
}
</style>