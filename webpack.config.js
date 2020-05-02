const path = require('path');
const webpack = require('webpack');
const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
  },
  entry: {
    main: ['./src/renderers/dom.js'],
  },
  output: {
    path: path.resolve('public', 'bundles'),
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new HtmlWebpackPlugin({
      path: path.resolve('public', 'bundles'),
      filename: 'index.ejs',
      template: '!!raw-loader!./views/index.ejs',
    }),
  ],
};

module.exports = config;
