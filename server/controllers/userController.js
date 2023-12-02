// Importa o modelo 'User' do arquivo '../models'
const { User } = require("../models");

// Importa os módulos 'models', 'jsonwebtoken' e 'bcrypt'
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Cria um objeto vazio para armazenar funções relacionadas ao controle de usuários
const userController = {};

// Função para registrar um novo usuário
userController.register = async (req, res) => {
  try {
    // Obtém informações do corpo da requisição
    let info = {
      nome: req.body.nome,
      usuario: req.body.usuario,
      senha: req.body.senha,
      email: req.body.email,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
    }

    // Cria um novo usuário no banco de dados usando as informações fornecidas
    await db.User.create(info);

    // Retorna uma resposta de sucesso em formato JSON
    return res.status(200).json({ message: "A conta foi registrada" });
  } catch (error) {
    // Em caso de erro, imprime o erro no console e retorna uma resposta de erro
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "A conta não foi registrada" });
  }
};

// Função para realizar o login do usuário
userController.login = async (req, res) => {
  try {
    // Obtém as credenciais de login do corpo da requisição
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    // Procura um usuário no banco de dados com o nome de usuário fornecido
    const user = await db.User.findOne({ where: { usuario } });

    // Verifica se o usuário foi encontrado
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados usando bcrypt
    const senhaCorrespondente = bcrypt.compareSync(senha, user.senha);

    // Verifica se as senhas correspondem
    if (!senhaCorrespondente) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Gera um token de autenticação usando jwt e a chave secreta, configurando o prazo de validade
    const token = jwt.sign({ userId: user.id_usuario }, "chave_secreta", {
      expiresIn: 30000,
    });

    // Define o cabeçalho de autorização na resposta
    res.set("Authorization", `Bearer ${token}`);
    let id = user.id
    let nome = user.nome
    // Retorna uma resposta de sucesso em formato JSON, incluindo o token
    res.status(200).json({auth: true, token, id, nome  });
  } catch (error) {
    // Em caso de erro, imprime o erro no console e retorna uma resposta de erro
    console.log(error);
    res.sendStatus(500);
  }
};
userController.mostrar_usuario = async (req, res) => {
  try {
    const id = req.params.id
    const user = await db.User.findOne({ where: { id } });

    return res.status(200).json(user);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Não foi possível executar" });
  }
};

userController.mostrar_usuarios = async (req, res) => {
  try {
    const data = await db.User.findAll();

    return res.status(200).json(data);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Não foi possível executar" });
  }
};
// Exporta o objeto 'userController' para ser utilizado em outros arquivos
module.exports = userController;

// Para criar um novo controller baseado neste exemplo, siga estes passos:
// 1. Crie um novo arquivo, como 'novoController.js'.
// 2. Copie este conteúdo para o novo arquivo.
// 3. Modifique as funções conforme necessário para atender aos requisitos específicos do novo controller.
// 4. Use o novo controller em outros arquivos, importando e utilizando-o da mesma forma que este exemplo.