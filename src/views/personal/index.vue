<template>
    <div class="personal-container">
        <div class="header no-login" v-if="!user">
            <div class="login-btn" @click="$router.push('/login')">
                <img src="@/assets/personal.jpg" class="imgPerson">
                <span class="span">登录 / 注册</span>
            </div>
        </div>
        <div class="header login" v-else>
            <div class="personInfo">
                <div class="left">
                    <img :src=" userInfo.photo " class="avatar">
                    <span class="text">{{ userInfo.name }}</span>
                </div>
                <van-button round native-type="button" class="btn" @click="$router.push('/profile')">
                    编辑资料
                </van-button>
            </div>
            <div class="bottom">
                <div class="block">
                    <span class="count">{{ userInfo.art_count }}</span>
                    <span class="text">头条</span>
                </div>
                <div class="block">
                    <span class="count">{{ userInfo.follow_count }}</span>
                    <span class="text">关注</span>
                </div>
                <div class="block">
                    <span class="count">{{ userInfo.fans_count }}</span>
                    <span class="text">粉丝</span>
                </div>
                <div class="block">
                    <span class="count">{{ userInfo.like_count }}</span>
                    <span class="text">获赞</span>
                </div>
            </div>
        </div>
        <van-grid :column-num="2" clickable>
            <van-grid-item  text="收藏" >
                <i slot="icon" class="iconfont icon-shoucang"></i>
            </van-grid-item>
            <van-grid-item  text="历史" >
                <i slot="icon" class="iconfont icon-lishi"></i>
            </van-grid-item>
        </van-grid>
        <van-cell title="消息通知" is-link/>
        <van-cell title="小智同学" is-link class="mb-9"/>
        <van-cell title="退出登录" class="logout-cell" v-if="user" @click="onLoginOut"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserInfo } from '@/api/user.js'

export default {
    name:'personalIndex',
    data(){
        return {
            userInfo:{}
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        onLoginOut(){
            this.$dialog.confirm({
                title: '确定退出登录吗',
            })
            .then(() => {
                // on confirm
                this.$store.commit('deleteUser','USER_TOKEN')
            })
            .catch(() => {
                // on cancel
                return
            });
        },
        async loadUserInfo(){
            try {
                const res = await getUserInfo()
                this.userInfo = res.data
            } catch (error) {
                return console.log(error.message)
            }
        }
    },
    created(){
        this.loadUserInfo()
    }
}
</script>

<style scoped lang="less">

.no-login{
    height: 361px;
    background: url('~@/assets/Haw.JPG');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-btn{
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.imgPerson{
    height: 150px;
    width: 150px;
    border-radius: 50%;
}

.span{
    margin-top: 20px;
    font-size: 35px;
    color: #ffff;
}

.login{
    height: 361px;
    background: url('~@/assets/Haw.JPG');
    background-size: cover;
    
}

.personInfo{
    // background-color: pink;
    height: 250px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // background-color: pink;
    .left{
        margin-left: 25px;
        display: flex;
        align-items: center;
        .text{
            margin-left: 23px;
            font-size: 30px;
            color: #ffff;
        }
    }
    .btn{
        margin-right: 20px;
        height: 45px;
        // width: 160px;
        font-size: 25px;
        // color: #ffff;
    }
}
.avatar{
    width: 132px;
    height: 132px;
    border-radius: 50%;
}

.bottom{
    height: 111px;
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    // background-color: #bfa;
    .block{
        // width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ffff;
        .count{
            font-size: 36px;
        }
        .text{
            font-size: 23px;
        }
    }
}

.van-grid{
    margin-bottom: 15px;
}
.van-grid-item{
    height: 141px;
    
    font-size: 28px;
    .icon-shoucang{
        color: #eb5253;
        font-size: 45px;
    }
    .icon-lishi{
        color:#ff9d1d;
        font-size: 45px;
    }
    
}

.logout-cell{
    margin-top: 15px;
    .van-cell__title{
        text-align: center;
        span{
            color:#eb5253
        }
    }
}
</style>