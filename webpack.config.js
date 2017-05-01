const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SvgStore = require('webpack-svgstore-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'assets/javascript/app.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'assets/bundle'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader?pretty&exports=false']
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'stylus-loader'])
      },
      {
        test: /.(jpe?g|gif|png|svg|woff|woff2|eot|ttf)$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      __svg__: path.join(__dirname, 'assets/images/svg/'),
    },
    extensions: ['.js', '.json']
  },
  plugins: [

    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),

    new SvgStore({
      svgoOptions: {
        plugins: [{
          convertTransform: true
        }, {
          removeDoctype: true
        }, {
          removeDesc: true
        }, {
          removeTitle: true
        }, {
          removeMetadata: true
        }, {
          removeUselessStrokeAndFill: true
        }, {
          removeEmptyAttrs: true
        }, {
          removeStyleElement: true
        }]
      },
      prefix: 'icon-'
    }),
    new ExtractTextPlugin('styles.css?[hash]'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'templates/index.pug')
    })
  ]
}

