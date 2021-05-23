import ApiService from '../services/ApiService';

const ApiPlugin = {
  install(Vue, options) {
    Vue.prototype.$api = new ApiService(options);

  }
};

export default ApiPlugin;
