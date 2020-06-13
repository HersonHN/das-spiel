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



module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',

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

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
      sourcemaps: false,
    }),
  ],

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