import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import ApiPlugin from "@/plugins/ApiPlugin";

import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(ApiPlugin, {'host': 'https://fcc-weather-api.glitch.me'});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
