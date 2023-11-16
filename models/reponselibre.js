/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reponselibre', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    rep: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      field: 'rep'
    },
    idql: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'questionlibre',
        key: 'ID'
      },
      field: 'idql'
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
    tableName: 'reponselibre'
  });
};
