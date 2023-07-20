/*
 * @Description:
 * @Hash: 不是路由组件
 * @Date: 2021-01-14 11:14:49 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-03-18 15:51:55 +0800
 * @LastEditors: JackChou
 */
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {
  console.log('env')
  console.log(env)
  return {
    // mode: env.prod ? 'production' : 'development',
    mode: 'development',
    devtool: env.prod ? 'source-map' : 'eval-cheap-module-source-map',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.png$/,
          use: {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: !env.prod },
            },
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
      }),
    ],
    devServer: {
      inline: true,
      hot: true,
      open: true,
      stats: 'minimal',
      contentBase: __dirname,
      overlay: true,
    },
  }
}
