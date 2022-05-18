<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      :empty-text="emptyText"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDbClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="55"
      />
      <!-- 序号 -->
      <el-table-column
        v-if="showIndex"
        label="序号"
        align="center"
        :index="dataIndex"
        type="index"
        width="60"
      />
      <el-table-column
        v-for="(th, i) in tableHeader"
        :key="i"
        :label="th.label"
        align="center"
        :width="th.width"
        :label-class-name="th.labelClassName"
        :class-name="th.className"
      >
        <template #default="{row, $index}">
          <slot
            v-if="th.slot"
            :name="th.slot"
            :row="cloneRow(row)"
            :$index="$index"
          />
          <template v-else>{{ getRow(row, th.prop) }}</template>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="showPagination"
      :current-page.sync="page.page_index"
      :page-sizes="[ 10, 20, 30, 50, 100 ]"
      :page-size.sync="page.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total_count"
      @size-change="handleSizeChange"
      @current-change="pageCurrentChange"
    />
  </div>
</template>

<script>
import Page from '@/models/Page';

export default {
  name: 'CommonDynamicTable',

  props: {
    // 表格数据
    tableData: {
      type: Array,
      required: true,
      default: () => [],
    },

    // 表格列表
    tableHeader: {
      type: Array,
      required: true,
    },

    // eslint-disable-next-line
    emptyText: String,

    // 显示 checkbox 列
    showSelection: Boolean,

    // 显示序号
    showIndex: Boolean,

    // 序号，同el-table-column index
    // eslint-disable-next-line
    index: [Number, Function],

    // 显示分页组件
    // eslint-disable-next-line
    showPagination: Boolean,

    page: {
      type: Object,
      default: () => new Page(),
    },
  },

  methods: {
    // 序号
    dataIndex(index) {
      return (this.page.page_index - 1) * this.page.page_size + index + 1;
    },
    // 当前 row 被vue托管了，直接使用的话，row 对象没有 toSring 方法，解析的时候会报错
    cloneRow(row) {
      return JSON.parse(JSON.stringify(row));
    },

    // 内容
    getRow(row, prop) {
      const p = prop.trim().split('.');
      let c = row;

      p.forEach(i => {
        c = c && c[i];
      });
      return c;
    },

    // 某一行被点击
    handleRowClick(row) {
      this.$emit('row-click', row);
    },

    // 某一行被双击击
    handleRowDbClick(row) {
      this.$emit('row-dblclick', row);
    },

    // 选中事件
    handleSelectionChange(val) {
      this.$emit('selection-change', val);
    },

    // 分页
    handleSizeChange(val) {
      this.$emit('pagination', this.page.page_index, val);
    },

    // 改变当前页
    pageCurrentChange(val) {
      this.$emit('pagination', val, this.page.page_size);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
