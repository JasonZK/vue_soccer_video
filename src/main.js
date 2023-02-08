import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'

// import VideoPlayer from 'vue-video-player'
// // import 'vue-video-player/src/custom-theme.css'
// import 'video.js/dist/video-js.css'
//
// Vue.use(VideoPlayer)


import request from "@/utils/request";
Vue.prototype.requset = request


Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
