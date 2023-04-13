<template>
    <div class="homeContainer">
        <van-nav-bar
            class="page-nav-bar"
        >
            <van-button 
                round 
                size="small" 
                slot="title" 
                icon="search" 
                class="search-btn"
                @click="toSearch" 
            >
                搜索
            </van-button>
        </van-nav-bar>
        <van-tabs class="vanTabs" v-model="active">
            <van-tab :title="ch.name" v-for="ch in channelsList" :key="ch.id" class="vanTab">
                <articleList :channel = "ch"></articleList>
            </van-tab>
            <div slot="nav-right" class="nav-right-holder">
            </div>
            <div slot="nav-right" class="nav-right" @click="showPopup">
                <i class="iconfont icon-gengduo"></i>
            </div>

        </van-tabs>
        <van-popup 
            v-model="show" 
            :style="{ height: '100%',width:'100%' }" 
            closeable 
            close-icon-position="top-left"
            
        >
            <channelEdit 
                :channelsList = "channelsList" 
                :channelActive="active" 
                @updateActive="onUpdateActive"
            >
            </channelEdit>
        </van-popup>
    </div>
</template>

<script>
import { getChannelsList } from '@/api/user'
import articleList from './components/article-list.vue'
import channelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
    name:'homeIndex',
    data() {
        return {
            channelsList:[],
            show: false,// 弹窗标识
            active: 0 // 高亮数组下标
        }
    },
    components:{
        articleList,
        channelEdit
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        async loadChannelsList(){
            try {
                if(this.user){
                    // 已经登录在线获取 channelsList
                    const res = await getChannelsList()
                    this.channelsList = res.data.channels
                    console.log(this.channelsList)
                }else{
                    // 未登录在本地获取 channelsList
                    this.channelsList = getItem('TOUTIAO_CHANNELS')
                }
                
            } catch (error) {
                return console.log(error.message)
            }
        },
        showPopup() {
            this.show = true;
        },
        onUpdateActive(index){
            this.show = false
            this.active = index
        },
        toSearch(){
            this.$router.push('/search')
        }
    },
    created(){
        this.loadChannelsList()
    },
    mounted(){

    }
}
</script>

<style scoped lang="less">
.homeContainer{

    /deep/.van-tabs__line{
        width: 30px;
        background-color: #5babfb;
    }
    .page-nav-bar{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
    }
    /deep/.van-tabs__wrap {
        position: fixed;
        top: 92px;
        // 必须设置层级,否则无法看到元素
        z-index: 1;
    }

    .placeholder{
        height: 92px;
        background-color: pink;
    }
    
    
    /deep/.van-nav-bar__title{
        max-width: unset;
    }
    .search-btn{
        // text-align: center;
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        color: #ffff;
        font-size: 28px;
        .van-icon{
            font-size: 32px;
            color:#ffff
        }
    }
    /deep/.van-tab{

        border-right: 1px solid #e8e7e9;
    }
    .nav-right-holder{
        display: flex;
        // 宽高设置不上的原因是因为宽被子元素占完了,因此设置为 0 使其不参与空间的计算
        flex-shrink: 0;
        height: 88px;
        width: 70px;
    }
    .nav-right{
        position: fixed;
        right: 0;
        height: 88px;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.9;
        .icon-gengduo{
            font-size: 28px;
        }
    }
    /deep/ .van-tab--active{
        border-bottom: #5babfb;
    }
    .van-tabs__nav{
        .van-tabs_line{
            width: 31px !important;
            height: 6px;
            background-color: #5babfb!important;
        }
    }
    
}

</style>