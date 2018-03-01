/**
 * @author guofeng
 * @date   2018/3/1 下午1:46
 * @Description: 服务端入口文件
 */

// entry-server.js 服务端入口文件
import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        const { app, router, store } = createApp()

        // 此处的context是server.js中传入的对象，可包含所需的数据
        const { url } = context
        const { fullPath } = router.resolve(url).route

        if (fullPath !== url) {    // 路由不匹配，直接拒绝
            return reject({ url: fullPath })
        }
        router.push(url)    // 设置当前路由
        // 路由解析完成后
        router.onReady(() => {
            // 获取路由对应组件
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            // 执行组件中的asyncData方法，获取组件所需数据
            Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
                store,
                route: router.currentRoute
            }))).then(() => {
                isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
                // 执行完所有asyncData后将store的状态保存到上下文中，
                // 之后会写入到window.__INITIAL_STATE__中，供浏览器端的根组件使用
                context.state = store.state
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}