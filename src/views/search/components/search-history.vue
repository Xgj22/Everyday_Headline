<template>
    <div>
        <van-cell title="搜索历史" >
            <div slot="right-icon">
                <van-icon name="delete-o"></van-icon>
            </div>
        </van-cell>
        <van-cell v-for="(history,index) in historyList" :key="index">
            <div slot="title">{{ history }}</div>
        </van-cell>
    </div>
</template>

<script>
export default {
    name:'search-history',
    props:{
        historyList:{
            type:Array,
            required:true
        }
    }
}
</script>

<style>

</style>