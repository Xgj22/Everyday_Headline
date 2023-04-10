<template>
    <div>
        <van-cell v-for="(item,index) in list" :key="index" >
            <template #title>
                <span class="custom-title van-multi-ellipsis--l2">{{ item.title }}</span>
                <!-- <van-tag type="danger">标签</van-tag> -->
            </template>
            <div slot="label">
                <div v-if="item.cover.type===3" class="imgContainer">
                    <div class="imgContainerWarp" v-for="(img,index) in item.cover.images" :key="index" >
                        <van-image class="van-image" :src="img" fit="cover"></van-image>
                    </div>
                </div>
                <div class="spanContainer">
                    <span class="text">{{ item.aut_name }}</span>
                    <span class="text">{{ item.comm_count }} 评论</span>
                    <span class="text">{{ item.pubdate | relativeTime}}</span>
                </div>

            </div>
            <van-image 
                slot="default"
                :src="item.cover.images[0]" 
                v-if="item.cover.type===1" 
                class="coverImg"
                fit="cover"
            >
            </van-image>
        </van-cell> 
    </div> 
</template>

<script>
export default {
    name:'articleItem',
    props:{
        list:{
            required:true
        }
    }
}
</script>

<style scoped lang="less">
.van-cell__value{
    margin-left: 20px;
    flex: unset;
    height: 146px;
    width: 232px;
}
.imgContainer{
    display: flex;
    flex-direction: row;
    .imgContainerWarp{
        // flex = 1 先将父元素挤满整个空间,在把图片填充上去
        flex:1;
        height:146px;
        &:not(:last-child){
            padding-right: 5px;
        }
        .van-image{
            width: 100%;
            height: 146px;
        }
    }

}

.spanContainer{
    margin-top: 10px;
    .text{
        margin-right: 5px;
    }
}

</style>