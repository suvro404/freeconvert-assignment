import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import fcassignment from './fcassignment'

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    modules: {
        fcassignment
    }
});

export default store
