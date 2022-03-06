'use strict';

const path                          = require( "path");
const helpers                       = require('./helpers');
const VueLoaderPlugin               = require('vue-loader/lib/plugin');
const FixStyleOnlyEntriesPlugin     = require( "webpack-fix-style-only-entries" );


module.exports = {

  mode: "development",

  entry:  [ './src/js/app.js' ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@' : helpers.root('resources')
    }
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './js')
  },
  module:{
    rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FixStyleOnlyEntriesPlugin()
  ],
};
