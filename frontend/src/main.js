import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Unicon from 'vue-unicons';
import { uniCog } from 'vue-unicons/src/icons';

Unicon.add([uniCog]);
Vue.use(Unicon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
