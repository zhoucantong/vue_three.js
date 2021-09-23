module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.(txt|frag|vert)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}