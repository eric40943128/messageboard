const { Controller } = require('egg');
const moment = require('moment');

class MessageController extends Controller {
  async list() {
    const { ctx } = this;
    const messages = await ctx.model.Message.findAll({ order: [['datetime', 'DESC']] });
    ctx.body = messages.map(msg => ({
      id: msg.id,
      username: msg.username,
      text: msg.text,
      datetime: moment(msg.datetime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
    }));
  }

  async create() {
    const { ctx } = this;
    if (!ctx.session.user) {
      ctx.status = 401;
      ctx.body = { error: '請先登入' };
      return;
    }

    const { username, text } = ctx.request.body;
    if (!username || !text || text.trim() === '') {
      ctx.status = 400;
      ctx.body = { error: '留言內容不能為空' };
      return;
    }

    await ctx.model.Message.create({ username, text, datetime: new Date() });
    ctx.body = { message: '留言發表成功' };
  }

  async update() {
    const { ctx } = this;
    if (!ctx.session.admin) {
      ctx.status = 403;
      ctx.body = { error: '管理員權限不足' };
      return;
    }

    const { id } = ctx.params;
    const { text } = ctx.request.body;

    await ctx.model.Message.update({ text, datetime: new Date() }, { where: { id } });
    ctx.body = { message: '留言已更新' };
  }

  async delete() {
    const { ctx } = this;
    if (!ctx.session.admin) {
      ctx.status = 403;
      ctx.body = { error: '管理員權限不足' };
      return;
    }

    const { id } = ctx.params;
    await ctx.model.Message.destroy({ where: { id } });
    ctx.body = { message: '留言已刪除' };
  }
}

module.exports = MessageController;