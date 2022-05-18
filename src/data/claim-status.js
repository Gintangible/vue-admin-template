const claimStatus = [
  {
    key: '',
    label: '全部',
    name: '全部'
  },
  {
    key: 'NOT_SUBMITTED',
    label: '未提交',
    name: '未提交'
  },
  {
    key: 'CLAIM_APPLICATION_WAIT_AUDIT',
    label: '待审核索赔申请书',
    name: '待审核索赔申请书'
  },
  {
    key: 'CLAIM_APPLICATION_AUDITED',
    label: '索赔申请书审核通过',
    name: '索赔申请书审核通过'
  },
  {
    key: 'TEMPORARY_SAVED',
    label: '暂存待处理',
    name: '暂存待处理'
  },
  {
    key: 'SYSTEM_AUDITED',
    label: '系统审核通过',
    name: '系统审核通过'
  },
  {
    key: 'SYSTEM_REJECTED',
    label: '系统驳回',
    name: '系统驳回'
  },
  {
    key: 'WAIT_INSURANCE_COMPANY_AUDITED',
    label: '待保司审核',
    name: '待保司审核'
  },
  {
    key: 'INSURANCE_COMPANY_ACCEPTED',
    label: '保司受理中',
    name: '保司受理中'
  },
  {
    key: 'INSURANCE_COMPANY_REJECTED',
    label: '保司驳回',
    name: '保司驳回'
  },
  {
    key: 'WAIT_REVIEW',
    label: '待复审',
    name: '待复审'
  },
  {
    key: 'REVIEW_REJECTED',
    label: '复审拒绝',
    name: '复审拒绝'
  },
  {
    key: 'INSURANCE_COMPANY_COMPLETED',
    label: '保司已结案',
    name: '保司已结案'
  },
  {
    key: 'CANCELED',
    label: '已取消',
    name: '已取消'
  },
  {
    key: 'INSURANCE_COMPANY_ANNUL_OR_REFUSED',
    label: '保司案件注销/拒赔',
    name: '保司案件注销/拒赔'
  }
];

export default claimStatus;
