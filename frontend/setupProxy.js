const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8001',
      changeOrigin: true,
      secure: false,
      logLevel: 'silent', // Suppress proxy logs
      onError: (err, req, res) => {
        console.log('Proxy Error:', err.message);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Proxy error: Backend server not available');
      },
    })
  );
  
  app.use(
    '/admin',
    createProxyMiddleware({
      target: 'http://localhost:8001',
      changeOrigin: true,
      secure: false,
      logLevel: 'silent',
    })
  );
};
