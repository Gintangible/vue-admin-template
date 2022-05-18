import { Loading } from 'element-ui';

let needLoadingRequestCount = 0;
let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '正在加载',
    background: 'rgba(0, 0, 0, 0.3)'
  });
}

function endLoading() {
  loading.close();
}

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) {
    return;
  }
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

export {
  showFullScreenLoading,
  hideFullScreenLoading
};
