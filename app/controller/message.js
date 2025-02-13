import { Controller } from 'egg'
import moment from 'moment'

class MessageController extends Controller {
  async list() {
    const { ctx } = this
    const messages = await ctx.model.Message.findAll({ order: [[ 'datetime', 'DESC' ]] })
    ctx.body = messages.map(msg => ({
      id: msg.id,
      username: msg.username,
      text: msg.text,
      datetime: moment(msg.datetime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
    }))
  }

  async create() {
    const { ctx } = this
    if (!ctx.session.user && !ctx.session.admin) {
      ctx.status = 401
      ctx.body = { error: '請先登入' }

      return
    }

    const { text } = ctx.request.body
    const username = ctx.session.admin ? 'admin' : ctx.session.user // ✅ 如果是管理員，強制設定 `admin`

    if (!username || !text || text.trim() === '') {
      ctx.status = 400
      ctx.body = { error: '留言內容不能為空' }

      return
    }

    await ctx.model.Message.create({ username, text, datetime: new Date() })
    ctx.body = { success: true, message: '留言發表成功' }
  }

  // 修改留言（使用者只能修改自己的留言，管理員可修改所有留言）
  async update() {
    const { ctx } = this
    const { text } = ctx.request.body
    const commentId = ctx.params.id

    const comment = await ctx.model.Message.findByPk(commentId)
    if (!comment) {
      ctx.status = 404
      ctx.body = { error: '留言不存在' }

      return
    }

    // 允許管理員修改所有留言，或使用者只能修改自己的留言
    if (ctx.session.admin || ctx.session.user === comment.username) {
      comment.text = text
      comment.datetime = new Date()
      await comment.save()
      ctx.body = { success: true, message: '留言已更新' }
    } else {
      ctx.status = 403
      ctx.body = { error: '您沒有權限修改此留言' }
    }
  }

  // 刪除留言（使用者只能刪除自己的留言，管理員可刪除所有留言）
  async delete() {
    const { ctx } = this
    const commentId = ctx.params.id

    const comment = await ctx.model.Message.findByPk(commentId)
    if (!comment) {
      ctx.status = 404
      ctx.body = { error: '留言不存在' }

      return
    }

    // 允許管理員刪除所有留言，或使用者只能刪除自己的留言
    if (ctx.session.admin || ctx.session.user === comment.username) {
      await comment.destroy()
      ctx.body = { success: true, message: '留言已刪除' }
    } else {
      ctx.status = 403
      ctx.body = { error: '您沒有權限刪除此留言' }
    }
  }
}

export default MessageController
