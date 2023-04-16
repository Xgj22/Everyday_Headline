<template>
    <div class="searchContainer">
        <form action="/">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                background="#3194f5"
                action-text
                @focus="isResultShow = false"
            />
        </form>
        <searchResult 
            :searchText="searchText" 
            v-if="isResultShow"
            @resultSearch="onSearch"
        ></searchResult>
        <search-suggestion 
            v-else-if="searchText"
            :searchText="searchText"
            @suggestSearch="onSearch"
        ></search-suggestion>
        <searchHistory 
            v-else
            :historyList="historyList"
        ></searchHistory>
    </div>
</template>

<script>
import searchHistory from './components/search-history.vue';
import searchResult from './components/search-result.vue';
import searchSuggestion from './components/search-suggestion.vue';


export default {
    name:'search-index',
    data() {
        return {
            searchText: '',
            isResultShow:false,
            searchSuggestionList:[],
            page:1, // 获取请求结果页面数，每次请求成功加一
            historyList:[]
        };
    },
    components:{
        searchHistory,
        searchResult,
        searchSuggestion
    },

    methods: {
        async onSearch(val) {
            this.isResultShow = true
            this.searchText = val
            this.historyList.push(this.searchText)
        },
        onCancel() {
            this.$router.back()
        },

    },
}
</script>

<style scoped lang="less">
.searchContainer{
    .van-search__action{
        color: #ffffff;
    }
}
</style>