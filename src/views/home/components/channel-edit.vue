<template>
    <div class="channelEditContainer">
        <div class="myChannel">
            <van-cell >
                <div slot="title">我的频道</div>
                <van-button round  size="mini" @click="onEdit">{{ isEdit?'完成':'编辑' }}</van-button>
            </van-cell>
            <van-grid :gutter="10" class="grid">
                <van-grid-item 
                    v-for="(ch,index) in channelsList" 
                    :key="index" 
                    class="gridItem"
                    @click="changeGrid(index)"
                >
                    <van-icon 
                        name="close" 
                        size="10" 
                        class="gridIcon" 
                        v-show="isEdit&&!fixChannels.includes(ch.id)"
                        @click="deleteChannel(ch,index)"
                    />
                    <div class="gridDiv">
                        <span slot="text" 
                            class="myText"
                            :class="{ active:channelActive===index}"
                        >
                            {{ch.name}}
                        </span>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
        <div class="recommendChannel">
            <van-cell >
                <div slot="title">频道推荐</div>
            </van-cell>
            <van-grid :gutter="10" class="grid">
                <van-grid-item 
                    v-for="(ch,index) in recommendChannelsList" 
                    :key="index" 
                    class="gridItem"
                    @click="onAddChannel(ch)"
                >
                    <span slot="text" 
                    class="recommendText">
                        +{{ch.name}}
                    </span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
import { getAllchannelsList,addUserChannel,deleteUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
    name:'channelEdit',
    data() {
        return {
            allChannelsList:[],
            isEdit:false,
            fixChannels:[0] //受保护的频道列表(不被删除)
        }
    },
    props:{
        channelsList:{
            type:Array,
            required:true
        },
        channelActive:{
            type:Number,
            required:true
        }
    },
    computed:{
        recommendChannelsList(){
            return this.allChannelsList.filter(channel =>{
                return !this.channelsList.find(item => {
                    return item.id === channel.id
                })
            })
        },
        ...mapState(['user'])
    },
    methods:{
        onEdit(){
            this.isEdit = !this.isEdit
        },
        async loadAllChannelsList(){
            try {
                console.log(123)
                const res = await getAllchannelsList()
                this.allChannelsList = res.data.channels
            } catch (error) {
                return console.log(error)
            }
        },
        async onAddChannel(channel){
            if(this.isEdit){
                const res = this.allChannelsList.find(item => channel.id===item.id)
                this.channelsList.push(res)

                // 数据持久化处理
                if(this.user){
                    // 已登录,把数据请求接口放到线上
                    const res = await addUserChannel({
                        channels:{
                            id:channel.id, // 频道ID
                            seq:this.channelsList.length //序号
                        }
                    })
                    
                }else{
                    console.log(123)
                    // 未登录,把数据存储到本地
                    setItem('TOUTIAO_CHANNELS',this.channelsList)
                }
            }else{
                return console.log('请打开编辑状态')
            }
        },
        deleteChannel(channel,index){
            this.channelsList.forEach(item => {
                if(item.id === channel.id){
                    this.channelsList.splice(index,1)
                }
            });

            // 数据持久化处理，封装成一个函数
            this.persistentDeleteUserChannel(channel)
        },
        async persistentDeleteUserChannel(){
            try {
                if(this.user){
                    // 已登录,把数据请求接口放到线上
                    await deleteUserChannel(channel.id)
                    
                }else{
                    // 未登录,把数据存储到本地
                    setItem('TOUTIAO_CHANNELS',this.channelsList)
                }
            } catch (error) {
                this.$toast("操作失败，请稍后再试")
            }
            
        },
        changeGrid(index){
            // this.$emit('updateActive',channel,index)
            // 这里使用 $emit 发送事件,在父组件里面绑定监听函数
            this.$emit('updateActive',index)
            this.isEdit = false
        }

    },
    created(){
        this.loadAllChannelsList()
    }
}
</script>

<style scoped lang="less">
.channelEditContainer{
    padding-top: 120px;
}
.grid{
    /deep/.van-grid-item__content{
        background-color: #f4f6f6;
    }
    .gridItem{
    // white-space: nowrap;
        position: relative;
        height: 86px;
        .gridIcon{
            position: absolute;
            top:-10px;
            right: -5px;
            z-index: 2;
            border-radius: 50%;
            background-color: #ebebeb;
        }
        .myText{
            font-size: 25px;
        }
        .recommendText{
            font-size: 28px;
        }

        .active{
            color: red;
        }
    }

}

</style>