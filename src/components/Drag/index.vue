<template>
  <div
    v-show="value"
    ref="drag"
    :style="dragStyle"
    class="drag"
  >
    <div class="drag-button-group">
      <i
        :class="[isFullScreen ? 'el-icon-minus' : 'el-icon-full-screen']"
        @click="toggleDragFull"
      />
      <i class="el-icon-close" @click="close" />
    </div>
    <slot />
    <div
      ref="resize"
      class="drag-resize"
      @mousedown="resize"
    />
  </div>
</template>

<script>
export default {
  name: 'Drag',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
    width: {
      type: [String, Number],
      default: '90%',
    },
    height: {
      type: [String, Number],
      default: '40%',
    },
    left: {
      type: [String, Number],
      default: '100px',
    },
    top: {
      type: [String, Number],
      default: '400px',
    },

    minWidth: {
      type: String,
      default: '60%',
    },

    minHeight: {
      type: String,
      default: '10%'
    },

    moveClass: {
      type: String,
      default: '.el-card__header'
    },
  },

  data() {
    return {
      isFullScreen: false,
      moveEle: null,
      elStyle: {
        width: 100,
        height: 100,
        left: 0,
        top: 0,
      },
      MIN_X: 0,
      MIN_Y: 0,
      MAX_X: +document.body.clientWidth - 100,
      MAX_Y: +document.body.clientHeight - 50,
    };
  },

  computed: {
    dragStyle() {
      const { width, height, left, top } = this.elStyle;
      const style = {
        minWidth: this.minWidth,
        minHeight: this.minHeight,
        width: this.size2per(width),
        height: this.size2per(height, 'vertical'),
        left: this.size2per(left),
        top: this.size2per(top, 'vertical'),
      };
      return style;
    },
  },

  mounted() {
    this.getDragInitStyle();
    this.$nextTick(() => {
      this.moveEle = this.$refs.drag.querySelector(this.moveClass);
      if (this.moveEle) {
        this.moveEle.addEventListener('mousedown', this.dragMove);
        this.moveEle.addEventListener('dblclick', this.toggleDragFull);
        this.toggleMoveStyle();
      }
    });
  },

  methods: {
    // 默认横向
    size2num(size, direct) {
      let result = size;
      if (typeof size === 'number') {
        return result;
      }
      if (size.includes('px')) {
        result = size.replace(/\px/g, '');
      }
      if (size.includes('%')) {
        const docBoby = direct ? +document.body.clientHeight : +document.body.clientWidth;
        result = docBoby * (+size.replace(/\%/g, '') / 100);
      }
      return +result;
    },

    size2per(size, direct) {
      if (String(size).includes('%')) {
        return size;
      }
      const docBoby = direct ? +document.body.clientHeight : +document.body.clientWidth;
      return `${size / docBoby * 100}%`;
    },

    getDragInitStyle() {
      this.elStyle = {
        width: this.size2num(this.width),
        height: this.size2num(this.height, 'vertical'),
        left: this.size2num(this.left),
        top: this.size2num(this.top, 'vertical'),
      };
    },
    toggleMoveStyle() {
      if (this.isFullScreen) {
        this.moveEle.style.cursor = 'initial';
      } else {
        this.moveEle.style.cursor = 'move';
      }
    },

    getDistance(d, isVertical) {
      const minD = isVertical ? this.MIN_Y : this.MIN_X;
      const maxD = isVertical ? this.MAX_Y : this.MAX_X;
      if (d <= minD) {
        d = 0;
      }
      if (d >= maxD) {
        d = maxD;
      }
      return d;
    },

    // 移动元素
    dragMove(e) {
      e.preventDefault();
      const DIS_X = e.clientX - this.$refs.drag.offsetLeft;
      const DIS_Y = e.clientY - this.$refs.drag.offsetTop;
      document.onmousemove = (e) => {
        const EX = this.getDistance(e.clientX - DIS_X);
        const EY = this.getDistance(e.clientY - DIS_Y, true);
        this.elStyle.left = EX;
        this.elStyle.top = EY;
      };

      document.onmouseup = () => {
        this.$emit('move', this.elStyle.left, this.elStyle.top);
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    // 开始放大/缩放元素
    resize(e) {
      e.preventDefault();
      const resizeRef = this.$refs.resize;
      const DIS_X = e.clientX - resizeRef.offsetLeft;
      const DIS_Y = e.clientY - resizeRef.offsetTop;
      document.onmousemove = (e) => {
        const EX = e.clientX >= this.MAX_X ? this.MAX_X : e.clientX;
        const EY = e.clientY >= this.MAX_Y ? this.MAX_Y : e.clientY;
        this.elStyle.width = EX - DIS_X;
        this.elStyle.height = EY - DIS_Y;
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.$emit('resize', this.elStyle.width, this.elStyle.height);
      };
    },

    // 拖拽元素全屏切换
    toggleDragFull(e) {
      e.preventDefault();
      this.isFullScreen = !this.isFullScreen;
      if (this.isFullScreen) {
        this.elStyle = {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        };
      } else {
        this.getDragInitStyle();
      }
      this.toggleMoveStyle();
    },

    // 关闭弹窗
    close() {
      this.$emit('input', false);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.drag {
  position: fixed;
  user-select: none;
  background: #fff;
  overflow: auto;
  &:hover {
    z-index: 9;
  }
  .drag-button-group {
    text-align: right;
    i {
      margin-left: 10px;
      font-size: 20px;
    }
  }
  .drag-resize {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    background: #e1f3d8;
  }
}
</style>
