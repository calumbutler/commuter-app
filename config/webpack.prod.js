"use strict";
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineStylePlugin = require('./inline-style');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

const root = process.cwd();

module.exports = {
  profile: true,
  entry: path.join(root, 'src/js/main'),
  output: {
    path: path.join(root, 'dist'),
    filename: 'js/[name].js',//'js/[name].[hash].js',
    libraryTarget: 'amd'
  },
  resolve: {
    alias: {
      'js': path.join(root, 'src/js'),
      'css': path.join(root, 'src/css'),
      'images': path.join(root, 'src/images')
    }
  },
  externals: [function (context, request, callback) {
    // if (weCantMake(request)) {
    //   callback(null, 'amd ' + request);
    // } else {
      callback();
    //}
  }],
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader'
    }, {
      test: /critical\.scss$/,
      use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader'])
    }, {
      test: /app\.scss$/,
      loaders: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader'])
    }, {
      test: /\.(jpg|png|svg)$/,
      loader: 'url-loader?limit=25000',
      include: path.images
    }]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': {'NODE_ENV': '"production"'}}),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] }}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('css/critical.css'),
    new InlineStylePlugin('css/critical.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
      minify: {
        removeStyleLinkTypeAttributes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        minifyURLs: true,
        minifyCSS: true,
        minifyJS: true
      }
    })
  ]
};
