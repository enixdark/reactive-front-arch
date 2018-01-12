var path = require('path');
var webpack = require('webpack');

var src_root = __dirname + '/src';
var pkg_root = path.normalize(__dirname + '/dist');

var paths = {
  src_root: src_root,
  pkg_root: pkg_root,
  src: {
    scripts: src_root,
  },
  dist: {
    js: pkg_root + '/js',
  },
};

var config = {
  optimize: process.env.NODE_ENV === 'production',
  // optimize: true,
  paths: paths,
  manifest: {
    src: pkg_root + '/**/*',
    jsonOutputName: 'manifest.json',
    jsOutputName: 'js/manifest.js',
    dest: pkg_root,
  },
  webpack: {
    entries: {
      'main':paths.src.scripts + '/main.js',
    },
    aliases: {

    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        filename: "common.js"
      }),
      new webpack.ProvidePlugin({
          
      }),
    ],
  },
  livereload: {
    // if you change the port make sure to update it in the ini as well
    host: '0.0.0.0',
    port: 3000,
  },
  
  
};

module.exports = config;
