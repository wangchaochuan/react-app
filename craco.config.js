const path = require('path');
const { addBeforeLoaders, removeLoaders, loaderByName } = require('@craco/craco');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { DllReferencePlugin } = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const { name } = require('./package.json');
const manifest = require('./public/lib/vendor.json');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
  babel: {
    loaderOptions: {
      // babel-loader开启缓存
      cacheDirectory: true,
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 3001,
    client: {
      progress: true,
    },
    compress: true,
    hot: true,
    open: false,
  },
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
    plugins: [new WebpackBar(), new DllReferencePlugin({ manifest }), new AntdDayjsWebpackPlugin()],
    configure(webpackConfig, { env }) {
      // 配置扩展扩展名优化
      webpackConfig.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css', '.json'];
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
      // 开启持久化缓存
      webpackConfig.cache.type = 'filesystem';
      // 生产环境打包优化
      if (env !== 'development') {
        webpackConfig.plugins = webpackConfig.plugins.concat(
          // 打包体积分析
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
            openAnalyzer: true, // 构建完打开浏览器
            reportFilename: path.resolve(__dirname, `analyzer/index.html`),
          }),
          new CompressionWebpackPlugin({
            test: /\.(js|ts|jsx|tsx|css|scss)$/, //匹配要压缩的文件
            algorithm: 'gzip',
          })
        );
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            parallel: true, //开启并行压缩，可以加快构建速度
          }),
        ];
        // 生产环境关闭source-map
        webpackConfig.devtool = false;
        // 生产环境移除source-map-loader
        removeLoaders(webpackConfig, loaderByName('source-map-loader'));
        // 把耗时的loader放在thread-loader和cache-loader后面
        // addBeforeLoaders(webpackConfig, loaderByName('mini-css-extract-plugin'), 'thread-loader');
        addBeforeLoaders(webpackConfig, loaderByName('mini-css-extract-plugin'), 'cache-loader');
      } else {
        addBeforeLoaders(webpackConfig, loaderByName('style-loader'), 'thread-loader');
        addBeforeLoaders(webpackConfig, loaderByName('style-loader'), 'cache-loader');
      }
      return webpackConfig;
    },
  }),
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig, context: { env } }) => {
          if (env !== 'development') {
            // 缩小生产环境所有loaders的检索范围
            webpackConfig.module.rules[0].oneOf.forEach(rule => {
              rule.include = path.resolve(__dirname, 'src');
            });
          } else {
            // 缩小本地开发环境所有loaders的检索范围
            webpackConfig.module.rules[0].include = path.resolve(__dirname, 'src');
            webpackConfig.module.rules[1].oneOf.forEach((rule, index) => {
              rule.include = path.resolve(__dirname, 'src');
              // 本地开发环境babel-loader比较耗时,故加上thread-loader
              if (index === 3) {
                const babelLoader = {
                  loader: rule.loader,
                  options: rule.options,
                };
                rule.use = ['thread-loader', babelLoader];
                delete rule.loader;
                delete rule.options;
              }
            });
          }
          return {
            ...webpackConfig,
          };
        },
      },
    },
  ],
};
