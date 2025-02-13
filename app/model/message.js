export default app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize
  const Message = app.model.define('message', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING(50), allowNull: false },
    text: { type: TEXT, allowNull: false },
    datetime: { type: DATE, allowNull: false },
  })

  return Message
}
