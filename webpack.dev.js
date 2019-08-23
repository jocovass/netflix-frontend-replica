const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs',
    hot: true
  },
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
            // style loader will handel our css file and apply it to the html
            loader: 'style-loader'
          },
          {
            // css-loader will understand and handle the css imports in our js file
            loader: 'css-loader',
            options: {
              importLoaders: 2 // tells the css loader there is other loader before
              // modules: true //css modules
              // localIdentName: '[path][name]__[local]--[hash:base64:5]' // give the selector unique name
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
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   // images which exceed the limit specified wont be inlined but copied to the path given down
      //   loader: 'url-loader'
      // },
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
  }
});
