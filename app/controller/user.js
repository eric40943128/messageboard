import { Controller } from 'egg'

class UserController extends Controller {
  async login() {
    const { ctx } = this
    const { username, password } = ctx.request.body

    let success = false
    let message = '帳號或密碼錯誤'
    let status = 401
    let userData = null

    const user = await ctx.model.User.findOne({ where: { username, password } })
    if (user) {
      ctx.session.user = username
      success = true
      message = '登入成功'
      status = 200
      userData = { username }
    }

    ctx.status = status
    ctx.body = { success, message, ...userData }
  }

  async logout() {
    const { ctx } = this
    ctx.session = null // 清除 Session
    ctx.cookies.set('EGG_SESS', null, { maxAge: -1, httpOnly: true, overwrite: true }) // 強制刪除 Cookie

    ctx.body = { success: true, message: '已登出' }
  }

  async checkLogin() {
    const { ctx } = this
    const loggedIn = !!ctx.session.user
    const username = ctx.session.user || null

    ctx.body = { success: true, loggedIn, username }
  }

  async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body

    let success = false
    let message = '註冊成功'
    let status = 200

    if (!username || !password) {
      success = false
      message = '帳號與密碼不得為空'
      status = 400
    } else {
      const existingUser = await ctx.model.User.findOne({ where: { username } })
      if (existingUser) {
        success = false
        message = '該帳號已被註冊'
        status = 400
      } else {
        await ctx.model.User.create({ username, password })
        success = true
        message = '註冊成功'
      }
    }

    ctx.status = status
    ctx.body = { success, message }
  }
}

export default UserController
