import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0  },
  mutations: {

  },
  modules:{
    tab
  }
})

export default store