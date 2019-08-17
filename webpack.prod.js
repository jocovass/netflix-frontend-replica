const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  entry: ['@babel/polyfill', './src/index.js'],
  resolve: {
    // tells webpack if it encounters with a file import which doesn't have extension it should try these
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // babel is the standard for transpiling next generation js to current gen. js.
        // babel-loader will hook the babel package, babel-core holds the logic
        // babel-preset-env tranpiles everything correctly automatially
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          //for multiple loaders we can use the use property
          {
            loader: MiniCssExtractPlugin.loader
          },
          // {
          //   // style loader will handel our css file and apply it to the html
          //   loader: 'style-loader'
          // },
          {
            // css-loader will understand and handle the css imports in our js file
            loader: 'css-loader',
            options: {
              importLoaders: 2, // tells the css loader there is other loader before
              modules: true //css modules
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // important internaly
              plugins: [require('autoprefixer')({ grid: true })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        // images which exceed the limit specified wont be inlined but copied to the path given down
        loader: 'url-loader'
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './img',
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      // new OptimizeCssAssetsWebpackPlugin({}),
      new UglifyjsWebpackPlugin({
        exclude: /node_modules/
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});
