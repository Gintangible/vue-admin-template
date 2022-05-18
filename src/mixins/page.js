import Page from '@/models/Page';

const PAGE_MIXIN = {
  data() {
    return {
      page: new Page(),
    };
  },

  methods: {
    // 序号
    dataIndex(index) {
      return (this.page.page_index - 1) * this.page.page_size + index + 1;
    },

    // 获取当前选中的行的下标
    selectIndex(index) {
      return (this.page.page_index - 1) * this.page.page_size + index;
    },

    // page 重置
    resetPage() {
      this.page = Page.create({
        page_size: this.page.page_size,
      });
    },
  },
};

export default PAGE_MIXIN;
