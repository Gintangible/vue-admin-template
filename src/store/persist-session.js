/** *****************************************************************************
 *
 *    Copyright (c) 2017 - 2018
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import VuexPersistence from 'vuex-persist';
/**
 * 自定义 VuexPresistence 对象。
 *
 * @author 胡海星
 */
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage, // 使用浏览器
  supportCircular: false, // 不支持循环自引用状态对象
  asyncStorage: false, // 不支持异步存储设备
  strictMode: process.env.NODE_ENV !== 'production', // 生产环境不应使用strict模式

  /**
   * 状态过滤器，只有经过过滤的状态才会持久化。
   *
   * @param {Object} state
   *     待过滤的状态
   * @return
   *     过滤后的状态对象。
   */
  reducer: (state) => ({}),

  /**
   * 自定义从存储中恢复状态的过程。
   *
   * @param {String} key
   *     对应的主键。
   * @param {Object} storage
   *     存储设备，必须是同步存储设备。
   * @return
   *     被恢复的状态。
   */
  restoreState: (key, storage) => {
    const value = storage.getItem(key);
    const state = JSON.parse(value || '{}');
    return state;
  },

  /**
   * 自定义将状态保存到存储中的过程。
   *
   * @param {String} key
   *     对应的主键。
   * @param {Object} state
   *     待保存的状态。
   * @param {Object} storage
   *     存储设备，必须是同步存储设备。
   */
  saveState: (key, state, storage) => {
    const value = JSON.stringify(state);
    storage.setItem(key, value);
  }
});

export default vuexLocal;
