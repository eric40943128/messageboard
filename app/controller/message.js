import { Controller } from 'egg'
import moment from 'moment'

class MessageController extends Controller {
  async list() {
    const { ctx } = this
    let success = false
    let message = '無法取得留言'
    let data = []

    try {
      const messageList = await ctx.model.Message.findAll({ order: [[ 'datetime', 'DESC' ]] })
      success = true
      message = '留言列表取得成功'
      data = messageList.map(msg => ({
        id: msg.id,
        username: msg.username,
        text: msg.text,
        datetime: moment(msg.datetime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
      }))
    } catch (error) {
      ctx.status = 500
    }

    ctx.body = { success, message, data }
  }

  async create() {
    const { ctx } = this
    let success = false
    let message = '留言發表失敗'
    let status = 400

    if (!ctx.session.user && !ctx.session.admin) {
      message = '請先登入'
      status = 401
    } else {
      const { text } = ctx.request.body
      const username = ctx.session.admin ? 'admin' : ctx.session.user

      if (!username || !text || text.trim() === '') {
        message = '留言內容不能為空'
      } else {
        await ctx.model.Message.create({ username, text, datetime: new Date() })
        success = true
        message = '留言發表成功'
        status = 201
      }
    }

    ctx.status = status
    ctx.body = { success, message }
  }

  async update() {
    const { ctx } = this
    let success = false
    let message = '留言更新失敗'
    let status = 400

    const { text } = ctx.request.body
    const commentId = ctx.params.id

    try {
      const comment = await ctx.model.Message.findByPk(commentId)

      if (!comment) {
        message = '留言不存在'
        status = 404
      } else if (ctx.session.admin || ctx.session.user === comment.username) {
        comment.text = text
        comment.datetime = new Date()
        await comment.save()
        success = true
        message = '留言已更新'
        status = 200
      } else {
        message = '您沒有權限修改此留言'
        status = 403
      }
    } catch (error) {
      status = 500
    }

    ctx.status = status
    ctx.body = { success, message }
  }

  async delete() {
    const { ctx } = this
    let success = false
    let message = '留言刪除失敗'
    let status = 400

    const commentId = ctx.params.id

    try {
      const comment = await ctx.model.Message.findByPk(commentId)

      if (!comment) {
        message = '留言不存在'
        status = 404
      } else if (ctx.session.admin || ctx.session.user === comment.username) {
        await comment.destroy()
        success = true
        message = '留言已刪除'
        status = 200
      } else {
        message = '您沒有權限刪除此留言'
        status = 403
      }
    } catch (error) {
      status = 500
    }

    ctx.status = status
    ctx.body = { success, message }
  }
}

export default MessageController
