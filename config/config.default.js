/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1739002050624_3690';

  // add your middleware config here
  config.middleware = [];

  config.view ={
    mapping: {
      '.html': 'nunjucks',
    },
  }

  config.session = {
    key: 'EGG_SESS',
    maxAge: 0, // 讓 Session 只在伺服器運行期間有效
    httpOnly: true,
    encrypt: true,
    renew: true, // 讓 Session 重新產生，防止瀏覽器的舊 Cookie 保持登入
  };

  // Sequelize 設定
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'eric910831',
    database: 'messageboard',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};