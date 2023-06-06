const defaults = require('@wordpress/scripts/config/webpack.config');
const path = require('path');


module.exports = {
  ...defaults,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  entry: {
    ...defaults.entry,
    index: './src/index',
  },
  output: {
    path: path.resolve( __dirname, 'build' ),
  },
  module: {
    ...defaults.module,
    rules: [
      ...defaults.module.rules,
    ],
  },
  devServer: {
    hot: true, // Enable HMR
    devMiddleware: {
      writeToDisk: true,
    },
    allowedHosts: 'all',
    host: 'localhost',
    port: 8886,
    proxy: {
      '/build': {
        pathRewrite: {
          '^/build': '',
        },
      },
    },
  },
}; 