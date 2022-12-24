
export default {
  namespaced: true,
  state: {
    isCollapse: false
  },
  mutations: {
    setIsCollapse (state, data) {
      state.isCollapse = !state.isCollapse
    }

  },
  actions: {

  }
}