

export default [
    //重定向,在项目跑起来的时候，访问/，立刻访问到首页
    {
        path:'*',
        redirect:"/home",
        meta:{
            ishow:true
        }
    },
    {
        path:'/login',
        component:() => import('@/views/login')
    },
    {
        path:'/',
        // name:'layout',
        component:()=>import('@/views/Layout'),
        children:[
            {
                path:'/',
                redirect:"/personal",
            },
            {
                // 默认加载路由 path 路径为空
                path:'/home',
                name:'home',
                component:() => import('@/views/home')
            },
            {
                path:'/video',
                name:'video',
                component:() => import('@/views/video')
            },
            {
                path:'/qa',
                name:'qa',
                component:() => import('@/views/q&a')
            },
            {
                path:'/personal',
                name:'personal',
                component:() => import('@/views/personal')
            },
        ]
    }
]