const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://75.119.154.13:5000',
      changeOrigin: true,
    })
  );
};
