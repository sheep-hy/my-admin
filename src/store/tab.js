
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
    closeTag(state, data){
      // 删除
      const index=state.tabList.findIndex(item=>item.name===data.name)
      state.tabList.splice(index,1)

    }

  },
  actions: {

  }
}