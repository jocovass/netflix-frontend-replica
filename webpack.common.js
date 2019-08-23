// path is a defualt node module, it comes with NODE
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  output: {
    // with the resolve method we can generate a absolute path
    // __dirname is a var which refers to the directory this is running
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
    chunkFilename: '[id].js', // this prop let us use chunk of js files, basically is lazy loading to improve page performance
    publicPath: '' // tells webpack where our files are put, if it is a root folder of the server or it is a nested folder
  }
};
