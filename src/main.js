import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
Vue.use(VueResource);

import router from './modules/router.js';
import store from './modules/store.js';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
