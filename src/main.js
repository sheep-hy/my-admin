import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router';
import store from './store';
import "./api/mock";

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); //全局注入
// Vue.use(router)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
