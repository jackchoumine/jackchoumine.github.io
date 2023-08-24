/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-13 11:37:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-25 01:28:56
 * @Description : webpack 配置文件
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.tsx',
  },
  module: {
    rules: [
      // 解析 TypeScript
      {
        test: /\.(tsx?|jsx?)$/,
        use: 'ts-loader',
        exclude: /(node_modules|tests)/,
      },
      // 解析 CSS
      {
        test: /\.css$/i,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      // 解析 Less
      {
        test: /\.scss$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            // options: {
            //   modules: {
            //     mode: resourcePath => {
            //       if (/pure.css$/i.test(resourcePath)) {
            //         return 'pure'
            //       }
            //       if (/global.css$/i.test(resourcePath)) {
            //         return 'global'
            //       }
            //       return 'local'
            //     },
            //   },
            // },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
    // 设置别名
    alias: {
      '@/*': path.join(__dirname, 'src/*'),
      utils: path.join(__dirname, 'src/utils/'),
      components: path.join(__dirname, 'src/components/'),
      assets: path.join(__dirname, 'src/assets/'),
      apis: path.join(__dirname, 'src/apis/'),
      hooks: path.join(__dirname, 'src/hooks/'),
      https: path.join(__dirname, 'src/https/'),
      store: path.join(__dirname, 'src/store/'),
    },
  },
  devtool: 'inline-source-map',
  // 3000 端口打开网页
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
    open: true,
  },
  // 默认输出
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // 指定模板 html
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
