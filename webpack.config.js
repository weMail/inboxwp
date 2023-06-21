const defaults = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';


const config = {
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
};

if (! isProduction) {
  config.devServer = {
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
  }
}

module.exports = config;