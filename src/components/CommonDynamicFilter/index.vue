<template>
  <el-form
    ref="filterForm"
    :inline="inline"
    :model="query"
    size="small"
    :label-width="labelWidth"
    :rules="rules"
    class="filter-form"
  >
    <template v-for="(formItem, index) in form">
      <el-form-item
        :key="index"
        :label="formItem.label"
        :prop="formItem.prop"
        :rules="formItem.rule || []"
      >
        <el-input
          v-if="!formItem.type && !formItem.slot"
          v-model="query[formItem.prop]"
          :style="formItemStyle"
          :placeholder="formItem.placeholder"
          :disabled="formItem.disabled"
          :readonly="formItem.readonly"
          clearable
        />
        <el-select
          v-if="formItem.type === 'select'"
          v-model="query[formItem.prop]"
          :style="formItemStyle"
          :readonly="formItem.readonly"
          :disabled="formItem.disabled"
          clearable
          :placeholder="formItem.placeholder"
        >
          <el-option
            v-for="item in (formItem.options || [])"
            :key="item.key"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-if="formItem.type === 'datePicker'"
          v-model="query[formItem.prop]"
          :type="formItem.dateType"
          :style="formItemStyle"
          :default-time="formItem.defaultTime"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <slot
          v-if="formItem.slot"
          :name="formItem.slot"
          :form="form"
          :style="formItemStyle"
        />
      </el-form-item>
    </template>

    <el-form-item>
      <el-button
        size="mini"
        type="primary"
        @click="handleSearch"
      >
        查询
      </el-button>
      <el-button
        size="mini"
        @click="handeleReset"
      >
        重置
      </el-button>
      <slot name="button" />
    </el-form-item>
  </el-form>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'CommonDynamicFilter',

  props: {
    // eslint-disable-next-line
    filter: Object,

    form: {
      type: Array,
      required: true,
      default: () => [],
    },

    inline: {
      type: Boolean,
      default: true,
    },

    labelWidth: {
      type: String,
      default: '120px',
    },

    contentWidth: {
      type: String,
      default: '240px',
    },

    rules: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      query: {},
      queryArea: [],
      len: 0,
    };
  },

  computed: {
    formItemStyle() {
      return {
        width: this.contentWidth,
      };
    },
  },

  watch: {
    filter: {
      deep: true,
      handler(val) {
        this.query = cloneDeep(val);
      },
    },
  },

  created() {
    this.query = cloneDeep(this.filter);
  },

  mounted() {
    this.handleSearch();
  },

  methods: {
    // 查询
    handleSearch() {
      this.$refs.filterForm.validate((valid) => {
        if (valid) {
          this.$emit('query', cloneDeep(this.query));
        } else {
          return false;
        }
      });
    },
    handeleReset() {
      this.$refs.filterForm.resetFields();
      this.$emit('reset');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
