import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const dateFormat = {
  bind: (el, binding, vnode) => {
    const { value: _obj } = binding;
    const { context: _this, data } = vnode;
    const { expression: key } = data.model;

    const modelValue = (value, index, els) => {
      if (!value || (_obj && _obj.disabledDate && _obj.disabledDate(value))) {
        return;
      }
      // 输入时去除连字符， format 部分使用utc 时间会导致时间倒退一天
      let time = dayjs(value).utc().format();
      if (_obj && _obj.format) {
        time = dayjs(value).format(_obj && _obj.format);
      }
      // 更新 VueComponent 中的数据
      const keys = key.split('.');
      let target = null;
      const KEYSMAXINDEX = keys.length - 1;
      keys.forEach((k, i) => {
        /**
         * 如果传的时间是个数组，如 type = daterange，进行数组赋值；
         *  反之，如type = date，直接赋值。
         * 赋值时需要与 el-date-picker 的 value-format 保持一致，不然组件会运行错误
         */
        if (KEYSMAXINDEX === 0) {
          if (els > 1) {
            _this.$set((_this[k] || (_this[k] = [])), index, time);
          } else {
            _this[k] = time;
          }
          return;
        }

        if (i === KEYSMAXINDEX) {
          if (els > 1) {
            _this.$set((target[k] || (target[k] = [])), index, time);
          } else {
            target[k] = time;
          }
        } else {
          // eslint-disable-next-line
          target = target !== null ? target[k] : ((_obj && _obj.modelName) ? _this[_obj.modelName][_obj.index] : _this[k]);
        }
      });
    };

    if (_this && _this._isVue) {
      const inputs = el.querySelectorAll('input');
      inputs.forEach((input, index) => {
        input.addEventListener('change', (e) => {
          modelValue(e.target.value, index, inputs.length);
        });
      });
    }
  },
};

export default dateFormat;
