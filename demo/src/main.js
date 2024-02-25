import Vue from 'vue'
import App from './App.vue'
import mapboxgl from '!mapbox-gl'

Vue.config.productionTip = false
Vue.prototype.$mapboxgl = mapboxgl // 挂载mapboxgl到Vue上

new Vue({
  render: h => h(App),
}).$mount('#app')
