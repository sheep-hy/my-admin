import vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
vue.use(VueRouter)
// 创建路由组件
// 2 将路由与组件进行映射
const routes = [
  {
    path: "/", component: Main,
    children: [
      { path: "home", component: Home },
      { path: "user", component: User }
    ]
  },

]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
// const router = VueRouter.createRouter({
//   // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//   history: VueRouter.createWebHashHistory(),
//   routes, // `routes: routes` 的缩写
// })
const router = new VueRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  // history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
export default router

// 
