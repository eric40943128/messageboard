/* eslint valid-jsdoc: "off" */

export default appInfo => {
  const config = {}

  config.keys = appInfo.name + '_1739002050624_3690'

  config.middleware = []

  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  }

  config.session = {
    key: 'EGG_SESS',
    maxAge: 0,
    httpOnly: true,
    encrypt: true,
    renew: true,
  }

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
  }

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  }

  return config
}
