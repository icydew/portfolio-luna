var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {

  entry: {
    'app': './main.js'
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'resolve-url',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },

  postcss: [
    autoprefixer({
      browsers: ['ie >= 8', 'last 2 versions']
    })
  ],

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: './index.html'
    }),
  ]

};