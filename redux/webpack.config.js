const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        // include: '.',
        loader: 'babel-loader',
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env'],
        //     plugins: [require('@babel/plugin-proposal-object-rest-spread')]
        //   }
        // }
        query: {
          presets: ["env", "es2015", "stage-2", "flow"],
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy',
            'transform-pipeline'
          ],
        },
        exclude: /(node_modules|bower_components)/,
      },
    ]
  },
};