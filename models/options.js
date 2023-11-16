/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('options', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    opt: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'opt'
    },
    idqc: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'questionchoix',
        key: 'ID'
      },
      field: 'idqc'
    }
  }, {
    tableName: 'options'
  });
};
