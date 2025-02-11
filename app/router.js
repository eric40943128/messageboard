/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 首頁顯示留言板
  router.get('/', controller.home.index);

  // 登入與發表留言頁面
  router.get('/login', controller.auth.loginPage);
  router.get('/post.html', controller.auth.postPage);

  //註冊請求及註冊頁面
  router.get('/register', controller.auth.registerPage); // 渲染註冊頁面
  router.post('/api/register', controller.user.register); // 處理註冊請求

  // 檢查登入狀態 API
  router.get('/api/check-login', controller.user.checkLogin);
  router.get('/api/check-admin', controller.admin.checkAdmin);


  // CSRF Token API
  router.get('/api/csrf', controller.csrf.getToken);

  // 使用者 API
  router.post('/api/login', controller.user.login);
  router.post('/api/logout', controller.user.logout);

  // 管理員 API
  router.post('/api/admin-login', controller.admin.login);
  router.post('/api/admin-logout', controller.admin.logout);

  // 留言 API
  router.get('/api/comments', controller.message.list);
  router.post('/api/comments', controller.message.create);
  router.put('/api/comments/:id', controller.message.update);
  router.delete('/api/comments/:id', controller.message.delete);
};
