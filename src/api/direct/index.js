import request from '@/utils/request';

const directApi = {
  // 直赔列表
  list(params) {
    return request({
      url: '/direct_claim',
      method: 'get',
      params,
    });
  },
};

export default directApi;
