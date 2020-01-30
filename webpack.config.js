const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/js/main.js',
    project: './src/js/project.js',
    analytics: './src/js/analytics.js',
},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
  {
    test: /\.css$/i,
    use: [
      {
        loader:  MiniCssExtractPlugin .loader,
        options: {
        publicPath:  '../',
        },},
        'css-loader',
        'postcss-loader'
    ]
       },
      {
        test: /\.(png|jpg|gif|ico|svg)$/i,
    use: [
      'file-loader?name=image/[name].[ext]',
      {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true, 
          disable: true,
        }
      },
    ]
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=vendor/[name].[ext]'
      }
    ]
  },
  plugins: [ 
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css'
  }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
 }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/project.html',
      filename: 'project.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/analytics.html',
      filename: 'analytics.html'
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
     })
  ]
};