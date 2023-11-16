// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.nobelprize.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
