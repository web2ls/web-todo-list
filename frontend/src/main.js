import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Unicon from 'vue-unicons';
import { uniCog, uniArrowLeft, uniSquareFull, uniCheckSquare, uniTrashAlt } from 'vue-unicons/src/icons';

Unicon.add([uniCog, uniArrowLeft, uniSquareFull, uniCheckSquare, uniTrashAlt]);
Vue.use(Unicon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
