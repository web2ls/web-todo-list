import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Unicon from 'vue-unicons';
import { uniCog, uniArrowLeft, uniSquareFull, uniCheckSquare, uniTrashAlt, uniFolder, uniEdit } from 'vue-unicons/src/icons';

Unicon.add([uniCog, uniArrowLeft, uniSquareFull, uniCheckSquare, uniTrashAlt, uniFolder, uniEdit]);
Vue.use(Unicon);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path === '/login')
    next();

  const token = localStorage.getItem('token');
  if (!token)
    next('/login');
  else
    next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
