module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const User = app.model.define('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: STRING(50), allowNull: false, unique: true },
      password: { type: STRING(255), allowNull: false }
    });
    return User;
  };