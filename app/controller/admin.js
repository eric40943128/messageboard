const { Controller } = require('egg');

class AdminController extends Controller {
  async login() {
    const { ctx } = this;
    const { password } = ctx.request.body;

    if (password === 'admin123') {
      ctx.session.admin = true;
      ctx.body = { success: true, message: '管理員登入成功' };
    } else {
      ctx.status = 401;
      ctx.body = { error: '管理員密碼錯誤' };
    }
  }

  async logout() {
    const { ctx } = this;
    ctx.session.admin = false;
    ctx.body = { success: true, message: '管理員已登出' };
  }

  async checkAdmin() {
    const { ctx } = this;
    ctx.body = { isAdmin: !!ctx.session.admin };
  }
}

module.exports = AdminController;