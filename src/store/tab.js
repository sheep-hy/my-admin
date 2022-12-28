import Cookie from 'js-cookie'
export default {
  namespaced: true,
  state: {
    isCollapse: false,
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home"
      }
    ], // 面包屑的数据
    menus: [],
  },
  mutations: {
    setIsCollapse (state, data) {
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑的数据
    selectMenu (state, data) {
      // 判断添加的数据是否为首页
      // 判断tablist中是否存在 不存在返回-1
      const index = state.tabList.findIndex(item => item.name === data.name)
      if (data.name !== 'home' && index === -1) {
        state.tabList.push(data)
      }

    },
    closeTag (state, data) {
      // 删除
      const index = state.tabList.findIndex(item => item.name === data.name)
      state.tabList.splice(index, 1)

    },
    // 左侧动态菜单 
    setMenu (state, data) {
      state.menus = data
      Cookie.set('menu', JSON.stringify(data))
    },
    // 设置路由 不同权限访问的路由不同
    addMenu (state, router) {
      if (!Cookie.get('menu')) return
      const menu = JSON.parse(Cookie.get('menu'))
      state.menus = menu
      const menuArray = []
      menu.forEach(item => {
        if (item.children && item.children.length) {
          item.children.map((i) => {
            i.component = () => import(`../views/${i.url}`)
            return i
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }

      })
      menuArray.forEach(j => {
        router.addRoute('main', j)
      })
      // console.log(menuArray, 'menuArray')
    }

  },
  actions: {

  }
}