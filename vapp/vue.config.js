const CopyPlugin = require('copy-webpack-plugin')

const path = require("path");
const port = process.env.VUE_APP_PORT

module.exports = {
  outputDir: path.resolve(__dirname, `dist/public`),
  publicPath: '/',
  assetsDir: 'src/assets',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // configureWebpack: {
  //   output: {
  //     publicPath: '/static/'
  //   }
  // },
  devServer: {
    port,
    disableHostCheck: true,
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },

  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },

  // chainWebpack: config => {
  //   config.plugins.delete('prefetch-index'),
  //     config.module
  //       .rule('vue')
  //       .use('vue-loader')
  //       .tap(args => {
  //         args.compilerOptions.whitespace = 'preserve'
  //       })
  // },
  // productionSourceMap: false,
  // assetsDir: './assets/',
  // configureWebpack: {
  //   plugins: [
  //     new CopyPlugin({
  //       patterns: [
  //         { from: 'src/assets/img', to: 'assets/img' },
  //         { from: 'src/assets/logos', to: 'assets/logos' },
  //         { from: 'src/assets/fonts', to: 'assets/fonts' }
  //       ],
  //     }),
  //   ]
  // }
}
