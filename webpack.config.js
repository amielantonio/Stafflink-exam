'use strict';

const path                          = require( "path");
const helpers                       = require('./helpers');
const VueLoaderPlugin               = require('vue-loader/lib/plugin');
const ExtractTextPlugin             = require( "extract-text-webpack-plugin" );
const FixStyleOnlyEntriesPlugin     = require( "webpack-fix-style-only-entries" );


module.exports = {

  mode: "development",

  entry:  [ './src/js/app.js', "./src/sass/theme/app.scss" ],
  resolve: {
    extensions: [".js", ".vue", ".scss", ".css"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@' : helpers.root('resources')
    }
  },
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, './')
  },
  module:{
    rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader' ]
        })
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new ExtractTextPlugin({ // define where to save the file
      filename: './css/app.css',
    }),
  ],
};
