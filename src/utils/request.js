import axios from 'axios';
import JSONbig from 'json-bigint';
import { MessageBox } from 'element-ui';
import store from '@/store';
import { showFullScreenLoading, hideFullScreenLoading } from './loading';
import config from '@/config';
// import requestErrorHandle from '@/utils/request-error-handle';

const jsonParser = JSONbig({
  storeAsString: true // 把64位整数存储为字符串
});

// create an axios instance
const service = axios.create({
  baseURL: config.base_url_api, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: config.request_timeout // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (!config.ignoreToken) {
      if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['X-Auth-User-Token'] = store.getters.token;
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      }
      config.headers['X-Auth-App-Code'] = 'insurance-claim-admin';
    }
    if (config.loading) {
      showFullScreenLoading();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.config.loading) {
      hideFullScreenLoading();
    }
    if (config.mocking) {
      return (response.data.data && response.data.data.default) ? response.data.data.default : response.data.data;
    }
    if (response && (response.data || response.data === 0)) {
      return jsonParser.parse(response.request.responseText);
    } else {
      return Promise.reject(null);
    }
  },
  error => {
    console.log('err' + error); // for debug
    // if (error.response) {
    //   const { data } = error.response;
    //   return requestErrorHandle(data);
    // } else {
    // 对于没有错误消息的错误，把错误对象JSON格式化后输出。
    const message = error.message;
    MessageBox.alert(`请求发生错误: ${message}`, '错误', { type: 'error' });
    return Promise.reject(error);
    // }
  }
);

export default service;
