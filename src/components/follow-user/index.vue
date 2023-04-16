<template>
    <van-button type="info" size="mini" v-if="isFollowed" @click="onFollow" :loading="followLoading">已关注</van-button>
    <van-button icon="plus" type="info" size="mini" plain v-else @click="onFollow" :loading="followLoading">关注</van-button>
</template>

<script>
import { followUser,deleteFollowUser } from '@/api/user'
export default {
    name:'followUser',
    data(){
        return {
            followLoading:false
        }
    },
    props:{
        isFollowed:{
            type:Boolean,
            required:true
        },
        autId:{
            type:[String,Number,Object],
            required:true
        }
    },
    methods:{
        async onFollow(){
            try {
                // 开启按钮加载状态，相当于开启了防抖状态，避免用户多次点击按钮
                this.followLoading = true
                if(this.isFollowed){// 已关注，取消关注
                    await deleteFollowUser(this.autId)
                    console.log('成功取消')
                }else{
                    // 未关注，关注用户
                    // console.log(this.autId)
                    // 用户不能关注他自己
                    await followUser({
                        target:this.autId
                    })
                    console.log('成功关注')
                }
                // this.isFollowed = !this.isFollowed
                // 更新视图，要修改父组件中 article is_followed 的值
                this.$emit('update-isFollowed',!this.isFollowed)

            } catch (error) {
                return console.log(error)
            }
            // 无论成功还是失败都要关闭 加载状态
            this.followLoading = false
        }
    }
}
</script>

<style>
</style>