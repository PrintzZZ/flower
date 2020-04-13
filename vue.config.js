module.exports = {
  publicPath: './',
  devServer: { // 使用反向代理解决跨域问题
    proxy: 'http://localhost:3000'
  }
}
