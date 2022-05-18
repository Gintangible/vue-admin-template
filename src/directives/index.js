import dateFormat from './date-format';
import hasRole from './has-role';
import hasPermission from './has-permission';

const directives = {
  dateFormat,
  hasRole,
  hasPermission,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  }
};
