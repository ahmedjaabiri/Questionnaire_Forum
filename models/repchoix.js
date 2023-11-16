/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('repchoix', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    idqc: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'options',
        key: 'ID'
      },
      field: 'idqc'
    },
    idu: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'idu'
    }
  }, {
    tableName: 'repchoix'
  });
};
