// Importa o módulo 'sequelize' e suas dependências
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Exporta uma função que recebe a instância 'sequelize' e define o modelo 'User'
module.exports = (sequelize) => {
  // Define a classe 'User' que estende a classe 'Model' do sequelize
  class User extends Model {}

  // Inicializa o modelo 'User' com as propriedades e configurações necessárias
  User.init(
    {
      // Define a coluna 'id' como inteiro, chave primária e autoincremento
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define a coluna 'nome' como string de até 256 caracteres, permitindo nulo
      nome: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      // Define a coluna 'usuario' como string de até 32 caracteres, permitindo nulo
      usuario: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      // Define a coluna 'senha' como string de até 100 caracteres, não permitindo nulo
      senha: {
        type: DataTypes.STRING(100),
        allowNull: false,
        // Utiliza o hook 'set' para gerar um hash da senha antes de salvá-la no banco de dados
        set(value) {
          const hashedPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('senha', hashedPassword);
        },
      },
      // Define a coluna 'email' como string de até 100 caracteres, permitindo nulo
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      // Define a coluna 'cpf' como string de até 14 caracteres, permitindo nulo
      cpf: {
        type: DataTypes.STRING(14),
        allowNull: true,
      },
      // Define a coluna 'telefone' como string de até 11 caracteres, permitindo nulo
      telefone: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
    },
    {
      // Configurações adicionais do modelo, como a instância 'sequelize', o nome do modelo e a tabela
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  // Para criar um novo modelo baseado neste exemplo, siga estes passos:
  // 1. Copie este arquivo para um novo arquivo, como 'novoModelo.js'.
  // 2. Renomeie a classe 'User' e o nome do modelo e da tabela conforme necessário.
  // 3. Ajuste as colunas conforme necessário para o novo modelo.
  // 4. Modifique o código conforme necessário para atender aos requisitos específicos do novo modelo.
  // 5. Use o novo modelo em outros arquivos, importando e configurando-o da mesma forma que este exemplo.

  return User;
  // Retorna o modelo 'User' configurado
};
