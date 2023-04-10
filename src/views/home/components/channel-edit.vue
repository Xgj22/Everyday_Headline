<template>
    <div class="channelEditContainer">
        <div class="myChannel">
            <van-cell >
                <div slot="title">我的频道</div>
                <van-button round  size="mini">编辑</van-button>
            </van-cell>
            <van-grid :gutter="10" class="grid">
                
                <van-grid-item v-for="(ch,index) in channelsList" :key="index" class="gridItem">
                    <van-icon name="close" size="10" class="gridIcon"/>
                    <div class="gridDiv">
                        <span slot="text" 
                            class="myText"
                            :class="{ active:channelActive===index} "
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
                <van-grid-item v-for="(ch,index) in channelsList" :key="index" class="gridItem">
                    <span slot="text" class="recommendText">
                        +{{ch.name}}
                    </span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
export default {
    name:'channelEdit',
    props:{
        channelsList:{
            type:Array,
            required:true
        },
        channelActive:{
            type:Number,
            required:true
        }
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