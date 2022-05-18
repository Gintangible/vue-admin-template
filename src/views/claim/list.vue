<template>
  <div class="direct-list-container">
    <div v-if="isNotFirstProduct">
      <common-dynamic-filter
        label-width="80px"
        :filter="commonFilter"
        :form="commonForm"
        class="direct-list-filter"
        @query="query"
      />
      <common-dynamic-table
        show-index
        show-pagination
        :page="page"
        :table-data="directList"
        :table-header="tableHeader"
        class="direct-list-table"
        @pagenation="getTableData"
      >
        <template #operation="{ row }">
          <el-button
            type="text"
            @click="directAudit(row.id, 'directAudit')"
          >审核</el-button>
          <el-button
            type="text"
            @click="directAudit(row.id, 'directAuditDetail')"
          >查看</el-button>
        </template>
      </common-dynamic-table>
    </div>
    <div v-else>
      一期暂不支持理赔预测
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CommonDynamicFilter from '@/components/CommonDynamicFilter';
import CommonDynamicTable from '@/components/CommonDynamicTable';
import pageMixin from '@/mixins/page';
import directApi from '@/api/direct';

export default {
  name: 'DirectList',

  components: {
    CommonDynamicFilter,
    CommonDynamicTable,
  },

  mixins: [pageMixin],

  data() {
    return {
      filter: {},
      commonFilter: {
        insured_name: '',
        insured_credential_number: '',
        policy_number: '',
        insured_mobile: '',
        multi_status: '',
        date: [],
      },
      commonForm: [{
        label: '姓名',
        prop: 'insured_name',
      }, {
        label: '身份证号',
        prop: 'insured_credential_number',
      }, {
        label: '保单号',
        prop: 'policy_number',
      }, {
        label: '手机号码',
        prop: 'insured_mobile',
      }, {
        type: 'select',
        label: '状态',
        prop: 'multi_status',
        options: [],
      }, {
        type: 'datePicker',
        col: 8,
        dateType: 'daterange',
        label: '申请日期',
        prop: 'date',
      }],
      directList: [],
      tableHeader: [{
        label: '理赔编号',
        prop: 'id',
      }, {
        label: '临时报案号',
        prop: '',
      }, {
        label: '保单号',
        prop: 'policy_number',
      }, {
        label: '申请日期',
        prop: 'create_time',
      }, {
        label: '出险人',
        prop: 'insured.name',
      }, {
        label: '手机号',
        prop: 'insured.mobile',
      }, {
        label: '身份证号',
        prop: 'insured.credential.number',
      }, {
        label: '状态',
        prop: 'status',
      }, {
        label: '操作',
        slot: 'operation',
      }],
    };
  },

  computed: {
    ...mapState('app', {
      isNotFirstProduct: (state) => state.isNotFirstProduct,
      product: (state) => state.product,
    }),
  },

  methods: {
    // 查询
    query(filter) {
      this.filter = filter;
      this.getTableData();
    },

    async getTableData() {
      const filter = Object.assign({
        create_time_start: this.filter.date && this.filter.date[0],
        create_time_end: this.filter.date && this.filter.date[1],
      }, this.filter);
      delete filter.date;
      const data = await directApi.list(Object.assign({
        product_code: this.product.value[0],
      }, filter, this.page, {
        page_index: this.page.page_index - 1,
      }));

      this.directList = data.content;
      this.page.total_count = data.total_count;
    },

    // 审核 + 详情
    directAudit(id, name) {
      console.log('gxw get ', id, name);
    },
  },
};
</script>

<style lang="scss" scoped>
.direct-list-container {
  padding: 20px;
}
</style>
