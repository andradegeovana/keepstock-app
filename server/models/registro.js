'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associação de tabelas ara chaves estrangeiras
      Registro.belongsTo (models.User, {
        foreignKey: "id",

      }),
      Registro.belongsTo(models.Produto, {
        foreignKey: "id_produto"
      })
    }
  }
  Registro.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_usuario: {
      type: DataTypes.INTEGER
    },

    id_produto:{
      type: DataTypes.INTEGER,
    },

    operacao: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Registro',
  });
  return Registro;
};