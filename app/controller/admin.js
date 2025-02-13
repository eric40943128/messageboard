import { Controller } from 'egg'

class AdminController extends Controller {
  async login() {
    const { ctx } = this
    const { password } = ctx.request.body

    let success = false
    let message = '管理員密碼錯誤'
    let status = 401

    if (password === 'admin123') {
      ctx.session.admin = true
      if (!ctx.session.user) {
        ctx.session.user = 'admin'
      }

      success = true
      message = '管理員登入成功'
      status = 200
    }

    ctx.status = status
    ctx.body = { success, message }
  }

  async logout() {
    const { ctx } = this

    if (ctx.session.user === 'admin') {
      ctx.session.user = null
    }
    ctx.session.admin = false

    ctx.body = { success: true, message: '管理員已登出' }
  }

  async checkAdmin() {
    const { ctx } = this
    ctx.body = { success: true, isAdmin: !!ctx.session.admin }
  }
}

export default AdminController
