import Vue from 'vue'

import vuex from 'vuex'

import { setItem,getItem,removeItem } from '@/utils/storage'

Vue.use(vuex)

const TOKEN_KEY = 'USER_TOKEN'

export default new vuex.Store({
    state:{
        user:getItem(TOKEN_KEY)
    },
    mutations:{
        setUser(state,data){
            state.user = data
            setItem(TOKEN_KEY,state.user)
        },
        deleteUser(state,data){
            state.user = null
            const key = data
            removeItem(key)
        }
    },
    actions:{

    },
    modules:{

    }
})