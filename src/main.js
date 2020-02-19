import Vue from 'vue'
import App from './App.vue'

import "template.data.gouv.fr";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
