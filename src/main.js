import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';
import directives from '@/directives';

import '@/icons'; // icon
import '@/permission'; // permission control

import config from '@/config';
const defaultSettings = require('./settings.js');

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (config.mocking) {
  const { mockXHR } = require('../mock');
  mockXHR();
}

console.info(`正在使用：${config.node_env}, ${config.app_name}, ${config.app_version}`);

Vue.use(ElementUI);

Vue.use(directives);

Vue.config.productionTip = false;

if (defaultSettings.sentry && process.env.NODE_ENV === 'production') {
  Sentry.init({
    Vue,
    environment: config.node_env,
    dsn: config.sentryDsn,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', config.sentrySiteUrl, /^\//],
      }),
    ],
    release: config.app_version,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    logErrors: true,
  });
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
