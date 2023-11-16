/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('repform', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    idf: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'form',
        key: 'id'
      },
      field: 'idf'
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
    tableName: 'repform'
  });
};
