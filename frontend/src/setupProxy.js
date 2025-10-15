const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
      headers: {
        'Connection': 'keep-alive'
      },
      onProxyReq: (proxyReq) => {
        // Ajouter des en-têtes CORS si nécessaire
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
      },
      onError: (err, req, res) => {
        console.error('Erreur de proxy:', err);
        res.status(500).json({ error: 'Erreur de connexion au serveur' });
      }
    })
  );
};
