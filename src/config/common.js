// 通用配置
export default {
  app_name: process.env.VUE_APP_APP_NAME,
  app_version: process.env.VUE_APP_APP_VERSION,
  node_env: process.env.NODE_ENV,
  // 开发环境调用生产配置 默认为 false
  prodServer: false,
  date_value_format: 'yyyy-MM-dd',              // 日期格式
  access_token_key: 'access_token',             // token 的 key
  access_token_expire_days: 20,                 // token 过期时间
  request_timeout: 5 * 60 * 1000,               // HTTP请求超时时间，单位为毫秒，默认值为5分钟
  data_page_size: 10,                           // 分页显示的列表中每页数据数目
  sentryDsn: 'https://3ec486e16b794600a40a379991b87c71@sentry.njzhyl.cn/3',
};
