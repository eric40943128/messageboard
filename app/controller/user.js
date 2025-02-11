const { Controller } = require('egg');

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    
    const user = await ctx.model.User.findOne({ where: { username, password } });
    if (user) {
      ctx.session.user = username;
      ctx.body = { success: true, message: '登入成功', username };
    } else {
      ctx.status = 401;
      ctx.body = { error: '帳號或密碼錯誤' };
    }
  }

  async logout() {
    const { ctx } = this;
    ctx.session = null; // 清除 Session
    ctx.cookies.set('EGG_SESS', null, { maxAge: -1, httpOnly: true, overwrite: true }); // 強制刪除 Cookie
    ctx.body = { success: true, message: '已登出' };
  }

  async checkLogin() {
    const { ctx } = this;
    ctx.body = { loggedIn: !!ctx.session.user, username: ctx.session.user || null };
  }
}

module.exports = UserController;