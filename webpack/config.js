'use strict'
var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var mockResponse = require('../mock-response.js')

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json', '.css']
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    open: true,
    useEslint: true,
    before(app) {
      app.get('/api/v1/it_emx_datatypes_TypeTestRef', function (req, res) {
        res.json(mockResponse)
      })

      app.get('/api/v2/it_emx_datatypes_TypeTestRef', function (req, res) {
        res.json(mockResponse)
      })

      app.get('/api/v2/i18n/form/en', function (req, res) {
        const localizedMessages = {
          'form_required_field': 'This field is required',
          'form_validation_failed': 'Validation failed',
          'form_not_a_valid_number': 'Not a valid number',
          'form_not_a_valid_url': 'Not a valid URL',
          'form_not_a_valid_email': 'Not a valid email',
          'form_not_within_range': 'Value is outside of range',
          'form_below_min_value': 'Value is below allowed value',
          'form_above_max_value': 'Value is above allowed value',
          'form_bool_true': 'True',
          'form_bool_false': 'False',
          'form_bool_missing': 'N/A'
        }
        res.json(localizedMessages)
      })
    }
  }
}