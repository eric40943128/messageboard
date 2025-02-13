import { Controller } from 'egg'

class AuthController extends Controller {

  async loginPage() {
    await this.ctx.render('login.html') // 渲染 login.html
  }

  async postPage() {
    await this.ctx.render('post.html') // 渲染發表留言頁面
  }

  async registerPage() {
    await this.ctx.render('register.html') // 渲染註冊頁面
  }
}

export default AuthController
