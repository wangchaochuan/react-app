const path = require('path');
const { DllPlugin } = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom'], // 需要统一打包的类库
  },
  output: {
    filename: '[name].dll.js', //name必须要和output.library一致
    path: path.resolve(__dirname, 'public/lib'),
    library: '[name]',
  },
  plugins: [
    new DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'public/lib/[name].json'), //manifest.json的存放位置
    }),
  ],
};
