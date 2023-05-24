const defaults = require('@wordpress/scripts/config/webpack.config');
const path = require('path');


module.exports = {
  ...defaults,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devServer: {
    hot: true, // Enable HMR
    devMiddleware: {
      writeToDisk: true,
    },
    allowedHosts: 'auto',
    host: 'appsero.test',
    port: 8080,
    proxy: {
      '/build': {
        pathRewrite: {
          '^/build': '',
        },
      },
    },
  },
}; 