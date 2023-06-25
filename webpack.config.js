const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify")
    }
  },
  plugins: [
    new Dotenv(),
    new NodePolyfillPlugin()
  ],
};
