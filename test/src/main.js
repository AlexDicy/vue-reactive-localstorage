import Vue from 'vue'
import App from './App.vue'
import VueReactiveStorage from '../../dist/index';


Vue.use(VueReactiveStorage, {
  firstLevel: {
    key1: 'test1',
    secondLevel: {
      key2: 'test2',
      thirdLevel: {
        key3: 'test3',
        numberArray: [1, 2, 3],
      }
    }
  },
  arr: ['A', 'B'],
  str: 'Default string',
  num: -2
})

new Vue({
  el: '#app',
  render: h => h(App)
})
