<template>
    <div class="layout-container">
        <router-view></router-view>
        <van-tabbar route >
            <van-tabbar-item to='/home' >
                <i slot="icon" class="iconfont icon-shouye"></i>
                主页
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <i slot="icon" class="iconfont icon-yuedu"></i>
                问答
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i slot="icon" class="iconfont icon-shipin"></i>
                视频
            </van-tabbar-item>
            <van-tabbar-item to="/personal">
                <i slot="icon" class="iconfont icon-wode"></i>
                {{ $store.state.user?'我的':'未登录' }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name:'layout',
    data() {
        return {
        }
    },
}
</script>

<style scoped>
.iconfont{
    font-size: 37px;
}
</style>