<template>
  <div class="button-group">
    <slot name="before" />
    <el-button
      v-if="isButtonShow('save') && !review"
      @click="save"
    >暂存</el-button>
    <el-button
      v-if="isButtonShow('approve')"
      type="primary"
      @click="approve"
    >审核通过</el-button>
    <el-button
      v-if="isButtonShow('reject')"
      type="danger"
      @click="reject"
    >{{ review ? '复审拒绝' : '审核拒绝' }}</el-button>
    <el-button
      v-if="isButtonShow('quit')"
      @click="quit"
    >{{ quitText }}</el-button>
    <slot name="after" />

  </div>
</template>

<script>
const BTN_GROUPS = {
  save: {
    msg: '暂存内容',
    emit: 'save'
  },
  approve: {
    msg: '通过审核',
    emit: 'approve'
  }
};

export default {
  name: 'ButtonGroup',

  props: {
    groups: {
      type: Array,
      default: () => ['save', 'approve', 'reject', 'quit'],
    },
    quitText: {
      type: String,
      default: '取消'
    },
    review: {
      type: Boolean,
    }
  },
  methods: {
    // 按钮是否显示
    isButtonShow(btn) {
      return this.groups.includes(btn);
    },
    // 按钮操作
    handle(name) {
      const btn = BTN_GROUPS[name];
      this.$confirm(btn.msg, '操作')
        .then(() => {
          this.$emit(btn.emit);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });
    },
    // 暂存
    save() {
      this.handle('save');
    },
    // 审核通过
    approve() {
      this.$emit('beforeApprove', flag => {
        if (flag) {
          this.handle('approve');
        }
      });
    },
    // 审核拒绝
    reject() {
      if (this.review) {
        this.$emit('review-reject');
        return;
      }
      this.$prompt('请输入驳回原因', '驳回原因', {
        inputType: 'textarea',
      })
        .then(({ value }) => {
          this.$emit('reject', value);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },
    // 取消
    quit() {
      this.$emit('quit');
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.button-group {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  .el-button + .el-button {
    margin-left: 50px;
  }
}
</style>
