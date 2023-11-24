// Importa o módulo 'sequelize' e suas dependências
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Exporta uma função que recebe a instância 'sequelize' e define o modelo 'Produto'
module.exports = (sequelize) => {
  // Define a classe 'Produto' que estende a classe 'Model' do sequelize
  class Produto extends Model {}

  // Inicializa o modelo 'Produto' com as propriedades e configurações necessárias
  Produto.init(
    {
      // Define a coluna 'id' como inteiro, chave primária e autoincremento
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define a coluna 'imagem' 
      imagem: {
        type:DataTypes.TEXT('long'),
        allowNull: true
      },
      // Define a coluna 'nome' 
      nome: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      // Define a coluna 'categoria' 
      categoria: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      // Define a coluna 'descricao' 
      descricao: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      // Define a coluna 'estoque' 
      estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Define a coluna 'preco' 
      preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    },
    {
      // Configurações adicionais do modelo, como a instância 'sequelize', o nome do modelo e a tabela
      sequelize,
      modelName: 'Produto',
      tableName: 'produtos',
    }
  );

  return Produto;
  // Retorna o modelo 'Produto' configurado
};
