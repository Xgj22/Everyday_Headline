<template>
    <div class="articleContainer">
        <!-- Header 区域 -->
        <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
        
        <van-loading type="spinner" color="#1989fa" class="loadingIco" v-if="isLoading"/>
        <!-- 文章信息区域 -->
        <div class="article-container" v-else-if="article && article.title">
            <!-- 文章标题 -->
            <h1 class="art-title">{{ article.title }}</h1>

            <!-- 用户信息 -->
            <van-cell center :title="article.aut_name" :label="article.pubdate">
                <template #icon>
                <!-- 头像 -->
                <img :src="article.aut_photo" alt="" class="avatar">
                </template>
                <template #default>
                <div>
                    <!-- 是否关注了作者 -->
                    <followUserComponent 
                        :isFollowed="article.is_followed"
                        :autId="article.aut_id"
                        @update-isFollowed="article.is_followed=$event"
                    >
                    <!--  @update-isFollowed="article.is_followed=$event" 是简写形式，模板中的 $event 是事件参数 -->
                    </followUserComponent>
                </div>
                </template>
            </van-cell>

            <!-- 分割线 -->
            <van-divider></van-divider>

            <!-- 文章内容 -->
            <div class="markdown-body art-content" v-html="article.content" ref="articleContainer"></div>

            <!-- 分割线 -->
            <van-divider>End</van-divider>

            <!-- 评论区 -->
            <!-- 疑惑点解除：从父组件传过去子组件的数据，子组件修改后父组件也会修改 -->
            <articleComments
                :list="commentList" 
                :articleId="articleId"
                ref="articleComment"
            ></articleComments>

            <!-- 点赞 -->
            <div class="like-box">
                <van-button icon="good-job" type="danger" size="small">已点赞</van-button>
                <van-button icon="good-job-o" type="danger" plain size="small">点赞</van-button>
            </div>

            <div class="footer" @click="isPostShow = true">
                <van-field placeholder="评论一下" />
            </div>

            <van-popup
                v-model="isPostShow"
                position="bottom"
                :style="{ height: '10%' }"
            >
                <commentPost 
                    :target="articleId"
                    @post-success="onPostSuccess"
                ></commentPost>
            </van-popup>
        </div>

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else>
            <van-icon name="failure"></van-icon>
            <p class="text">该资源不存在或已删除</p>
        </div>

        <!-- 加载失败：其他未知错误（例如网络原因或者服务端异常） -->
        <!-- <div class="error-wrap">
            <van-icon name="failure"></van-icon>
            <p class="text">内容加载失败！</p>
            <van-button class="retry-btn">点击重试</van-button>
        </div> -->
    </div>
</template>

<script>
import { getArticleDetail } from '@/api/article';
import followUserComponent from '@/components/follow-user'
import { ImagePreview } from 'vant';
import articleComments from './components/comment-list.vue';

import commentPost from './components/comment-post'

export default {
    name:'articleIndex',
    data(){
        return {
            isLoading:true,
            article:null,
            followLoading:false,
            isPostShow:false,
            content:'',
            commentList:[]
        }
    },
    props:{
        articleId:{
            type:[Number,String,Object],
            required:true
        }
    },
    components:{
        followUserComponent,
        articleComments,
        commentPost
    },
    methods:{
        async loadArticleDetail(){
            try {
                const res = await getArticleDetail(this.articleId)
                // 关闭加载状态
                this.isLoading = false
                setTimeout(()=>{
                    // const dom = this.$refs.articleContainer
                    // console.log(dom) 
                    this.previewImage()   
                },0)
                this.article = res.data
                console.log(this.article)
            } catch (error) {
                // 关闭加载状态
                this.isLoading = false
                console.log(this.isLoading)
                console.log('获取数据失败')
            }

        },
        previewImage(){
            // 获取 dom 元素
            const articleContent = this.$refs['articleContainer']
            // 获取 img 数组
            const imgs = articleContent.querySelectorAll('img')
            const images = []
            imgs.forEach((img,index) => {
                images.push(img.src)
                img.onclick = () =>{
                    // vant 组件库处理图片缓存的代码
                    // 由于返回数据图片无法显示，此代码失效
                    ImagePreview({
                        // 图片地址数组
                        images,
                        // 起始图片下标
                        startPosition: index,
                    });
                }
            });

        },
        onPostSuccess(data){
            // 关闭弹窗
            this.isPostShow = false
            this.$toast.success('发布成功');
            // 将 新元素 加到数组最前方，并且刷新 DOM
            this.commentList.unshift(data.new_obj)
            console.log(data)
        }
    },
    created(){
        this.loadArticleDetail()
    }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.articleContainer{
    // height: 80vh;
    
    padding-bottom: 45px;
}
/deep/.van-nav-bar__content{
    background-color: #3396fb;
    .van-icon{
        color: #f8f8f8;
    }
    .van-nav-bar__title{
        color: #f8f8f8;
    }
}

/deep/.van-loading{
    margin-top:100px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.article-container {
    // height: 80vh;
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 40px;
  font-weight: bold;
  margin: 40px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}

.error-wrap{
    padding-top: 200px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    color: #a7a7a7;
    .van-icon{
        font-size: 200px;
    }
    .retry-btn{
        color: #a7a7a7;
    }
}
.footer{
    position: fixed;
    bottom: 25px;
    width: 100%;
    height: 30px;

    .btn{
        margin-right: 80px;
    }
}
</style>