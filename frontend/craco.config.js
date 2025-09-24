module.exports = {
  devServer: {
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 3000,
    client: {
      webSocketURL: 'ws://0.0.0.0:3000/ws',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      return webpackConfig;
    },
  },
};
