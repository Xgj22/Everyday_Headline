<template>
    <div class="login-container">
        <van-nav-bar
            title="登录"
            class="page-nav-bar"
        >
            <i slot="left" class="iconfont icon-xiangzuojiantou" @click="leftBack"></i>
        </van-nav-bar>
        <van-form @submit="onSubmit" ref="loginFrom">
            <van-cell-group inset>
                <!-- 通过 filed 的 rules 配置校验规则 
                    当表单提交的时候自动触发表单验证，如果验证通过则触发 submit 事件
                    不通过则不会触发 submit
                 -->
                <van-field
                    v-model="user.mobile"
                    placeholder="手机号码"
                    :rules="userFromRules.mobile"
                    type="number"
                    maxlength="11"
                    name="mobile"
                >
                    <i slot="left-icon" class="iconfont icon-shouji"></i>
                </van-field>
                <van-field
                    v-model="user.code"
                    type="number"
                    placeholder="验证码"
                    maxlength="6"
                    :rules="userFromRules.code"
                    name="code"
                >
                    <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                    <template #button>
                        <van-count-down 
                        :time="1000*10" 
                        format="ss s" 
                        v-if="isShowCountDown"
                        @finish="isShowCountDown = false"
                        />
                        <!--  native-type="button" 阻止默认提交事件-->
                        <van-button 
                            v-else
                            round size="small" 
                            type="primary" 
                            class="sms-btn" 
                            native-type="button"
                            @click="onSendSms"
                        >
                            获取验证码
                        </van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div>
                <van-button block type="primary" native-type="submit" class="nav-button">
                提交
                </van-button>
            </div>
        </van-form>

    </div>
    
    

</template>

<script>
import { login,sendSms } from '@/api/user.js'

export default {
    name:'login',
    data() {
        return {
            user:{
                mobile:'13911111111',
                code:'246810'
            },
            userFromRules:{
                mobile:[
                    {
                        required:true,
                        message:'手机号不能为空'
                    },
                    {
                        pattern:/^1[3|5|6|7|8|9]\d{9}$/,
                        message:'手机号格式错误'
                    }
                ],
                code:[
                    {
                        required:true,
                        message:'验证码不能为空'
                    },
                    {
                        pattern:/^\d{6}$/,
                        message:'验证码格式错误'
                    }
                ]

            },
            isShowCountDown:false
        }
    },
    
    methods:{
        async onSubmit(){
            // 在组件中必须使用 this.$toast 来调用 Toast 组件
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
            });
            const user = this.user
            try {
                const userInfo = await login(user)
                console.log(userInfo)
                // 设置两个参数，一个是函数的名字，一个数据
                this.$store.commit('setUser',userInfo.data)
                this.$toast.success('登录成功')
                this.$router.push('/personal')
            } catch (error) {
                if(error.response.status===400){
                    console.log(error.response.data.message)
                    this.$toast.fail('手机或验证码格式错误')
                }else{
                    this.$toast.fail('登录失败，请稍后再试')
                }
               
            }
        },
        async onSendSms(){
            // 先单独对手机号进行表单验证
            try {
                this.$refs.loginFrom.validate('mobile')
            } catch (error) {
                return Promise.reject(new Error('fail'))
            }
            // 验证通过显示倒计时
            this.isShowCountDown = true
            try {
                const res = await sendSms(this.user.mobile)
                this.$toast.success('验证码发送成功')
                
            } catch (error) {
                this.$toast.fail('验证码发送失败')
                return Promise.reject(new Error('fail'))
            }
        },
        leftBack(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
/* .van-cell-group{
    height: 300px;
} */
/* .input1{
    height: 100px;
    line-height: 100px;
} */
.van-field__control{
    background-color: #ffffff;
}

.sms-btn{
    background-color: #ededed;
    border: none;
    
}

.iconfont{
    font-size: 37px;
}

.nav-button{
    width: 700px;
    margin: 20px 20px;
    background-color: #1a87fc;

}

.icon-xiangzuojiantou{
    color: #ffffff;
}
</style>