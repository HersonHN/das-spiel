const Path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function source(path, sufix = '.js') {
  return glob.sync(`${path}/*${sufix}`)
    .reduce((obj, fullpath) => {
      let name = Path.basename(fullpath, sufix);
      obj[name] = fullpath;
      return obj;
    }, {});
}

let isProd = (process.env.NODE_ENV === 'production')

let plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false,
    sourcemaps: false,
  }),
];

if (isProd) {
  let sourceMaps = new webpack.SourceMapDevToolPlugin({
    filename: '[name].js.map'
  });

  plugins.unshift(sourceMaps);
}


module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: (isProd) ? false : 'eval-source-map',

  entry: source('./src/js'),

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: __dirname,
            },
          },
          'css-loader',
        ],
      },

    ],
  },

  plugins: plugins,

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  devServer: {
    contentBase: __dirname,
    publicPath: '/dist/',
    compress: false,
    port: 8000,
    watchContentBase: true,
    liveReload: true,
  }

}