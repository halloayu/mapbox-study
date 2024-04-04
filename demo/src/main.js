import Vue from 'vue'
import App from './App.vue'
import mapboxgl from '!mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf'
// 引入ElementUI组件库
import ElementUI from 'element-ui'
//引入ElementUI的所有样式
import 'element-ui/lib/theme-chalk/index.css'
//使用ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$mapboxgl = mapboxgl // 挂载mapboxgl到Vue上
Vue.prototype.$turf = turf

new Vue({
  render: h => h(App),
}).$mount('#app')
