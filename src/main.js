import Vue from 'vue'
import router from './router'
import store from "./store";
import "./filters";
import App from './App.vue'

import "template.data.gouv.fr";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
