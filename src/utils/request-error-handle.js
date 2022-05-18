
import { MessageBox } from 'element-ui';
import store from '@/store';

export default function requestErrorHandle(error) {
  switch (error.code) {
    case 'AUTHORIZATION_REQUIRED':      // 对于未授权错误，要求用户重新登录
      MessageBox.confirm('您尚未登录或者已经登出，请选择重新登录，或者选择放弃停留在本页面', '是否重新登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '放弃',
        type: 'warning',
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          window.location.reload();
        });
      });
      return Promise.reject(error);
    case 'SESSION_EXPIRED':             // 对于已过期会话，要求用户重新登录
    case 'INVALID_ACCESS_TOKEN':        // 对于令牌无效会话，要求用户重新登录
      MessageBox.confirm('您的会话已过期，请选择重新登录，或者选择放弃停留在本页面', '是否重新登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '放弃',
        type: 'warning',
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          window.location.reload();
        });
      });
      return Promise.reject(error);
    case 'CLAIM_RATIO_INVALID':         // 对于新增或修改发票，后台校验发现发票报销比例错误，要特殊处理：
      return Promise.reject(error);     // 直接把错误抛出让调用方处理
    default:                            // 其他错误代码，默认显示错误消息
      if (error.message) {
        // 对于其他错误，如果有错误消息，则显示服务器返回的错误消息
        MessageBox.alert(error.message, '错误', { type: 'error' });
        return Promise.reject(error);
      } else {
        MessageBox.alert('服务器发生未知错误，请与管理员联系', '错误', { type: 'error' });
        return Promise.reject(error);
      }
  }
}
