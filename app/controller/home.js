const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index.html') // 渲染 index.html
  }
}

module.exports = HomeController
