<template>
    <div>
        <!-- 当用户点击某一个搜索建议项时，将 text 传递给父组件去搜索 -->
        <van-cell 
            icon="search"
            v-for="(text,index) in searchSuggestionList"
            :key="index"
            @click="$emit('suggestSearch',text)"
        >
        <!-- v-html 可以将带有 html 标签的字符串渲染到页面 -->
            <div slot="title" v-html="hightlight(text)"></div>
            <!-- <div slot="title">{{ text }}</div> -->
        </van-cell>
        
    </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search';
// 按需加载
import { debounce } from 'loadsh'
export default {
    name:'search-suggestion',
    data() {
        return {
            searchSuggestionList:[]
        }
    },
    props:{
        searchText:{
            required:true,
            type:String
        }
    },
    watch:{
        // 刚上来就开启监听
        immediate:true,
        searchText:{
            // handler 函数名称是固定的
            // debounce 相当于一个函数修饰符，包裹在函数外面，
            // 第一个参数是实现防抖的函数,第二个参数是 间隔时间 ，单位是毫秒
            handler:debounce(function(value){
                this.loadSearchSuggestion(value)
            },500)
        }
    },
    methods:{
        async loadSearchSuggestion(q){
            try {
                const res = await getSearchSuggestion(q)
                this.searchSuggestionList = res.data.options
            } catch (error) {
                return console.log(error)
            }
        },
        hightlight(text){
            // console.log(this.searchSuggestionList)
            // 思路
            //  replace(正则表达式,字符串) 可以匹配正则表达式中符合条件的元素替换成指定字符串
            // 将符合条件的字符串（与搜索框文本相同），替换成 带有 active Style 的 html 字符串
            const hightlightStr = `<span class="active">${this.searchText}</span>`
            const reg = new RegExp(this.searchText,'gi')
            return text.replace(reg,hightlightStr)
        }
        
    }
}
</script>

<style>
.active{
    color:red
}
</style>