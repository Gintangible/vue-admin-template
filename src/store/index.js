import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import vuexLocal from './persist';
import vuexSession from './persist-session';
import app from './modules/app';
import settings from './modules/settings';
import permission from './modules/permission';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    permission,
    user,
  },
  plugins: [vuexLocal.plugin, vuexSession.plugin],
  getters,
  mutations: {
    /**
     * 在 vuex 的 strict 模式下，vuex-persist 必须调用名为 RESTORE_MUTATION 的
     * mutation 对 vuex 的状态进行修改。
     */
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION
  }
});

export default store;
