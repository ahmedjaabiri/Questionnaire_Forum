/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    nomu: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'nomu'
    }
  }, {
    tableName: 'user'
  });
};
