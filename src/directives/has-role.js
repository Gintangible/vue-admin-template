import store from '@/store';

export default {
  inserted(el, binding) {
    const { value } = binding;
    const super_admin = 'admin';
    const roles = store.getters && store.getters.roles;

    if (value && value.length) {
      const hasRole = roles.some(role => {
        return super_admin === role || value.includes(role);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置角色权限标签值"`);
    }
  }
};
