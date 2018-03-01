/**
 * @author guofeng
 * @date   2018/3/1 下午1:44
 * @Description: 引入 router vuex 等插件，并声明根实例的工厂函数
 */

// app.js
import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'

// 与之前的app.js不同，为了避免服务端共用根组件，所以利用函数返回对象
// 与 data () { return { ... } } 这样的写法类似
// createStore () 和createRouter() 也是同样的原因
export function createApp () {
    const store = createStore()
    const router = createRouter()
    sync(store, router)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store }
}