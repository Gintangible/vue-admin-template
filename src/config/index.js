let env = process.env.VUE_APP_ENV || 'development';
import defaultConfig from './common';
if (defaultConfig.prodServer) {
  env = 'production';
}
/* eslint-disable */
const envConfig = require(`/env.${env}`);
/* eslint-enable */
const config = { ...defaultConfig, ...envConfig };

export default config;
