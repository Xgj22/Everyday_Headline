<template>
    <div class="userProfileContainer">
        <van-nav-bar
            class="page-nav-bar"
            left-arrow
            right-text="完成"
            title="个人资料"
            @click-left="$router.back()"
            @click-right="onClickRight"
        ></van-nav-bar>

        <input 
            type="file" 
            hidden 
            ref="file"
            @change="onFileChange"
        >
        <!-- 个人信息 -->
        <van-cell title="头像" is-link @click="$refs.file.click()">
            <img :src="user.photo" class="avatar">
        </van-cell>
        <!-- 弹出层 -->
        <van-popup v-model="isShowAvatar" position="bottom" :style="{ height: '100%' }" >
            <avatar 
                v-if="isShowAvatar"
                :user="user"
                @close="onclose"
                @update-photo="user.photo = $event"
            ></avatar>
        </van-popup>
    </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import avatar from './components/avatar'

export default {
    name:'userProfile',
    data() {
        return {
            user:{},
            isShowAvatar:false
        }
    },
    components:{
        avatar
    },
    methods:{
        async loadUserProfile(){
            try {
                const res = await getUserProfile()
                this.user = res.data
                console.log(this.user)
            } catch (error) {
                return console.log(error)
            }
        },
        onClickRight(){

        },
        onFileChange(){
            // 获取文件对象
            const file = this.$refs.file.files[0]
            // 基于文章对象获取 blob 数据
            const data = window.URL.createObjectURL(file)
            // 开启弹层
            this.isShowAvatar = true
            // file-input 如果选了同一个文件不会触发 change 事件
            // 解决方法就是每次使用完毕就把它的 value 清空
            this.$refs.file.value = ''
            console.log(data)
        },
        onclose(){
            this.isShowAvatar = false
        }
    },
    mounted(){
        this.loadUserProfile()
    }
}
</script>

<style scoped lang="less">
.avatar{
    height: 50px;
    width: 50px;
    border-radius: 50%;
}

/deep/.van-icon{
    color: #fff;
}

/deep/.van-nav-bar__text{
    color: #fff;
}

/deep/.van-cell__right-icon{
    color: gray;
}
</style>