module.exports = {
  publicPath: '',
  configureWebpack: {
    entry: {
      app: './src/js/main.ts'
    }
  },
  chainWebpack(config) {
    config.resolve.alias.delete('@')
    config.resolve
      .plugin('tsconfig-paths')
      .use(require('tsconfig-paths-webpack-plugin'))
  }
}
