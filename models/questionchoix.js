/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questionchoix', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    question: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      field: 'question'
    },
    idf: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'form',
        key: 'id'
      },
      field: 'idf'
    }
  }, {
    tableName: 'questionchoix'
  });
};
