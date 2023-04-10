// 处理相对时间的工具函数 dayjs是依赖的名字
import dayjs from 'dayjs'
import Vue from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载中文加载包
import 'dayjs/locale/zh-cn'

// 配置使用相对时间的插件
dayjs.extend(relativeTime)

// dayjs默认语言是英文,这里配置成中文
dayjs.locale('zh-cn')

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用了// 其实过滤器就相当于一个全局可用的方法(仅供模板使用)
// 参数1: 过滤器名称
// 参数2: 过滤器函数
// 使用方式:{[ 表达式  过滤器名称 }]
// 管道符前而的表达式的结果会作为参数传递到过滤器函数中// 过滤器的返回值会谊染到使用过滤器的模板位置
Vue.filter('relativeTime',value => {
    return dayjs() .to(dayjs(value))
})
// dayjs() 张取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().to(dayjs('2015'))) // 2 年以前