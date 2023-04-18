<template>
    <van-field  placeholder="评论一下吧" v-model="content">
        <div slot="button">
            <!-- 发布文章 -->
            <button class="btn" @click="onPost">发布</button>
        </div>
    </van-field>
</template>

<script>
import { addComment } from '@/api/comment';

export default {
    name:'commentPost',
    data() {
        return {
            content:''
        }
    },
    props:{
        target:{
            required:true,
            type:[Number,String,Object]
        }
    },
    methods:{
        async onPost(){
            try {
                this.$toast.loading({
                    message: '正在发布中...',
                    forbidClick: true,
                });
                const res = await addComment({
                    target:this.target, // 文章ID
                    content:this.content, // 评论的内容
                    art_id:null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
                })
                // 清空文本框
                this.content = ''
                // 关闭弹窗
                // 更新视图，这两个功能发到父组件完成
                this.$emit('post-success',res.data)
            } catch (error) {
                this.$toast.fail('发布失败')
                return console.log(error)
            }
        }
    }
}
</script>

<style>

</style>