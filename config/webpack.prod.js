const paths = require('./paths')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  // entry: [paths.src + '/lib/index.js'],
  devtool: false,

  /* sort, format, parse, stats, validate */

  entry: {
    sort: paths.src + "/lib/sort",
    format: paths.src + "/lib/format",
    parse: paths.src + "/lib/parse",
    stats: paths.src + "/lib/stats",
    validate: paths.src + "/lib/validate",
    index: paths.src + "/lib/index",
  },
  output: {
    // path: path.join(__dirname, "dist"),
    path: paths.build,
    filename: "[name].js",

    publicPath: '/',
    // filename: './lib/utils.js',
    // chunkFilename: './lib/utils.js',
  },
  plugins: [
    /**
     * MiniCssExtractPlugin
     *
     * Extracts CSS into separate files.
     *
     * Note: style-loader is for development, MiniCssExtractPlugin is for production.
     * They cannot be used together in the same config.
     */
     /*
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    */
  ],
  module: {
    /*
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
    */
  },

  /**
   * Optimization
   *
   * Production minimizing of JavaSvript and CSS assets.
   */
  optimization: {
    minimizer: [new TerserJSPlugin({}) /*, new OptimizeCSSAssetsPlugin({}) */],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: 'single',
    // This breaks apart commonly shared deps (react, semantic ui, etc) into one shared bundle. React, etc
    // won't change as often as the app code, so this chunk can be cached separately from app code.
    splitChunks: {
      /*
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|lodash)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      */
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
