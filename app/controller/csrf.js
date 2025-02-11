const { Controller } = require('egg');

class CsrfController extends Controller {
  async getToken() {
    const { ctx } = this;
    ctx.body = {
      csrf: ctx.csrf, // 獲取 CSRF Token
    };
  }
}

module.exports = CsrfController;