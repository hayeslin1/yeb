import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import { postRequest } from "./utils/api";


Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.postRequst = postRequest


router.beforeEach((to, from, next) => {
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
