import store from '@/store';

export default {
  inserted(el, binding) {
    const { value } = binding;
    const all_permission = '*:*:*';
    const permissions = store.getters && store.getters.permissions;

    if (value && value.length) {
      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || value.includes(permission);
      });

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置操作权限标签值`);
    }
  }
};
