import Cookies from 'js-cookie';
import { login, logout, getInfo } from '@/api/user';
import { resetRouter } from '@/router';
import store from '@/store';
import config from '@/config';

const getDefaultState = () => {
  return {
    token: Cookies.get(config.access_token_key),
    name: '',
    username: '',
    avatar: require('@/assets/images/user/avatar.png'),
    roles: [],
    permissions: [],
  };
};

const state = getDefaultState();

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    Cookies.set(config.access_token_key, token, {
      expires: config.access_token_expire_days,
    });
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(data => {
        commit('SET_TOKEN', data.token);
        commit('SET_NAME', data.name);
        commit('SET_ROLES', data.roles);
        store.dispatch('permission/generateRoutes', data.roles)
          .then(() => {
            resolve(data);
          })
          .catch((error) => reject(error));
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 获取 user 权限
  getInfo({ commit, state }) {
    return new Promise(resolve => {
      const token = state.token;
      getInfo(token).then((res) => {
        commit('SET_ROLES', res.roles);
        commit('SET_PERMISSIONS', res.permissions);
        resolve(state.roles);
      });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        Cookies.remove(config.access_token_key); // must remove  token  first
        resetRouter();
        commit('RESET_STATE');
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      Cookies.remove(config.access_token_key); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

