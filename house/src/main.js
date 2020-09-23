import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyTab from './components/Tab'
import axios from 'axios'
Vue.config.productionTip = false
Vue.component("my-tab",MyTab)
// 引入axios
// 配置地址的公共部分,并且表明了服务器的端口号为3030
axios.defaults.baseURL="http://127.0.0.1:3030";
Vue.prototype.axios=axios
// 1.淡入MintUI组件库
import MintUI from 'mint-ui'
// 2.导入MintUI的样式表文件
import 'mint-ui/lib/style.min.css'
// 3.通过Vue.use()方法将MintUI注册为插件
Vue.use(MintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
