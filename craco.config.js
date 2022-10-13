const path = require('path');
const { IgnorePlugin } = require('webpack');
const WebpackBar = require('webpackbar');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { name } = require('./package.json');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  webpack: smp.wrap({
    alias: {
      '@': pathResolve('src'),
      '@assets': pathResolve('src/assets'),
      '@components': pathResolve('src/components'),
      '@constants': pathResolve('src/constants'),
      '@containers': pathResolve('src/containers'),
      '@hooks': pathResolve('src/hooks'),
      '@mocks': pathResolve('src/mocks'),
      '@routes': pathResolve('src/routes'),
      '@services': pathResolve('src/services'),
      '@styles': pathResolve('src/styles'),
      '@types': pathResolve('src/types'),
      '@utils': pathResolve('src/utils'),
      '@contexts': pathResolve('src/contexts'),
    },
    plugins: [
      // 打包体积分析
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server',
      //   analyzerHost: '127.0.0.1',
      //   analyzerPort: 8888,
      //   openAnalyzer: true, // 构建完打开浏览器
      //   reportFilename: path.resolve(__dirname, `analyzer/index.html`),
      // }),
      new IgnorePlugin({
        resourceRegExp: /\.\/locale/,
        contextRegExp: /moment/,
      }),
      new WebpackBar(),
    ],
    configure(webpackConfig, { env, paths }) {
      console.log(`env:${env},paths:${paths}`);
      // 配置扩展扩展名
      webpackConfig.resolve.extensions = [...webpackConfig.resolve.extensions, ...['.scss', '.css']];
      // 接入微前端框架qiankun的配置,不接入微前端可以不需要
      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = 'umd';
      webpackConfig.output.globalObject = 'window';
      // splitChunks打包优化
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        cacheGroups: {
          commons: {
            chunks: 'all',
            // 将两个以上的chunk所共享的模块打包至commons组。
            minChunks: 2,
            name: 'commons',
            priority: 80,
          },
        },
      };
      return webpackConfig;
    },
  }),
  devServer: {
    // 本地服务的端口号
    port: 3001,
    // 本地服务的响应头设置
    headers: {
      // 允许跨域
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      progress: true,
    },
    compress: true,
    hot: true,
    open: false,
  },
  babel: {
    plugins: [
      // antd按需加载
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
      ],
    ],
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx|.tsx|.ts$/,
        use: ['thread-loader', 'babel-loader?cacheDirectory'],
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
};
