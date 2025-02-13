import { Controller } from 'egg'

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index.html') // 渲染 index.html
  }
}

export default HomeController
