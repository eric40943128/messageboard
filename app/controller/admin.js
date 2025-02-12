const { Controller } = require('egg')

class AdminController extends Controller {
  async login() {
    const { ctx } = this
    const { password } = ctx.request.body

    if (password === 'admin123') {
      ctx.session.admin = true

      // 若使用者已登入，保持該使用者名稱；否則設定為 "admin"
      if (!ctx.session.user) {
        ctx.session.user = 'admin'
      }

      ctx.body = { success: true, message: '管理員登入成功' }
    } else {
      ctx.status = 401
      ctx.body = { error: '管理員密碼錯誤' }
    }
  }

  async logout() {
    const { ctx } = this

    // 如果當前使用者是 "admin"，則一併登出使用者
    if (ctx.session.user === 'admin') {
      ctx.session.user = null
    }

    ctx.session.admin = false
    ctx.body = { success: true, message: '管理員已登出' }
  }

  async checkAdmin() {
    const { ctx } = this
    ctx.body = { isAdmin: !!ctx.session.admin }
  }
}

module.exports = AdminController
