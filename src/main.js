import Vue from 'vue';
import App from './App.vue';
import VueMask from 'v-mask'
import store from './store';
import './assets/tailwind.css';

Vue.config.productionTip = false;

Vue.use(VueMask);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
