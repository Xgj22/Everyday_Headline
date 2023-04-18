<template>
    <div class="avatarContainer">
        <img :src="user.photo" slot="default" class="avatar" ref="img"> 
        <div class="toolbar">
            <div class="text">
                <span @click="onClose">取消</span>
                <span @click="onConfirm">完成</span>
            </div>
        </div>
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { changeAvatar } from '@/api/user'

export default {
    name:'avatarIndex',
    props:{
        user:{
            required:true,
            type:Object
        }
    },
    // 要操作 DOM 元素放到 mounted 生命周期里面
    mounted(){
        // const image = document.getElementById('image');获取dom元素
        const image = this.$refs.img
        const cropper = new Cropper(image, {
            aspectRatio: 1,  //图片比例
            viewMode:1,  
            dragMode:'move',
            autoCropArea:1,
            cropBoxMovable:false,
            cropBoxResizable:false,
            background:false,
            // crop(event) {
            //     console.log(event.detail.x)
            //     console.log(event.detail.y)
            //     console.log(event.detail.width)
            //     console.log(event.detail.height)
            //     console.log(event.detail.rotate)
            //     console.log(event.detail.scaleX)
            //     console.log(event.detail.scaleY)
            // },
        })
        console.log(cropper)
    },
    methods:{
        onClose(){
            this.$emit('close')
        },
        onConfirm(){
            // console.log(this.cropper.getData())
            this.cropper.getCroppedCanvas().toBlob(async blob => {
                // console.log(blob)

                // 如果接口要求 Content-Type 是 mutiipart/form-data
                // 则你必须传递 FromData 对象
                const formData = new FormData()
                formData.append('photo',blob)

                const { data } = await changeAvatar(formData)

                // 关闭弹出层
                this.$emit('close')

                // 更新视图
                this.$emit('update-photo',data.data.photo)
            })
        }
    },
    
}
</script>

<style scoped lang="less">
.avatarContainer{
    height: 100%;
    background-color: #070707;
}

.avatar{
    // croppjs 的要求
    display: block;
    max-width: 100%;
}

.toolbar{
    position: fixed;
    bottom: 0;
    .text{
        width: 100vw;
        display: flex;
        color: #ffff;
        flex-direction: row;
        justify-content: space-between;
        font-size: 35px;
    }
    
    // color: #ffff;
}
</style>