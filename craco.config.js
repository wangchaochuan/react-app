const path = require('path');
const { name } = require('./package.json');

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
    },
    configure(webpackConfig) {
      // 配置扩展扩展名
      webpackConfig.resolve.extensions = [...webpackConfig.resolve.extensions, ...['.scss', '.css']];

      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = 'umd';
      // webpackConfig.output.jsonpFunction = `webpackJsonp_${name}`;
      webpackConfig.output.globalObject = 'window';
      return webpackConfig;
    },
  },
  devServer: {
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
