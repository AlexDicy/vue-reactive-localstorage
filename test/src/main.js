import Vue from 'vue'
import App from './App.vue'
import VueReactiveStorage from "../../dist/index";

Vue.use(VueReactiveStorage)

new Vue({
  el: '#app',
  render: h => h(App)
})
