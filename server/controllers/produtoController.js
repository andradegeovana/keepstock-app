// Importa o modelo 'User' do arquivo '../models'
const { Produto } = require("../models");

// Importa os módulos 'models', 'jsonwebtoken' e 'bcrypt'
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Cria um objeto vazio para armazenar funções relacionadas ao controle de produtos
const produtoController = {};

// Função para cadastrar um produto
produtoController.cadastrar = async (req, res) => {
  try {
    // Obtém informações do corpo da requisição
    let info = {
      nome: req.body.nome,
      categoria: req.body.categoria,
      descricao: req.body.descricao,
      estoque: req.body.estoque,
      preco: req.body.preco
    }

    // Cria um novo produto no banco de dados usando as informações fornecidas
    await db.Produto.create(info);

    // Retorna uma resposta de sucesso em formato JSON
    return res.status(200).json({ message: "O produto foi registrado com sucesso!" });
  } catch (error) {
    // Em caso de erro, imprime o erro no console e retorna uma resposta de erro
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "O produto não foi registrado" });
  }
};

// Função para excluir produtos do estoque
produtoController.remover_produto = async (req, res) => {
  try {
    // Obtém as credenciais do produto do corpo da requisição
    const id = req.body.id;
    const id_usuario = req.body.id_usuario;

    // Procura um produto no banco de dados com o id do produto
    const produto = await db.Produto.findOne({ where: { id } });

    // Verifica se o produto foi encontrado
    if (!id || !id_usuario) {
      return res.status(401).json({ message: "Unauthorized" });
      
    }else{
      produto.remove(id)
    }

    // Define o cabeçalho de autorização na resposta
    res.set("Authorization", `Bearer ${token}`);

    // Retorna uma resposta de sucesso em formato JSON, incluindo o token
    res.status(200).json({auth: true, token });
    
  } catch (error) {
    // Em caso de erro, imprime o erro no console e retorna uma resposta de erro
    console.log(error);
    res.sendStatus(500);
  }
};

// Função para editar um produto
produtoController.editar_produto = async (req, res) => {
  try {
    const id = req.body.id;
    const produto = await db.Produto.findOne({ where: { id } });
    let info = {
      nome: req.body.nome,
      categoria: req.body.categoria,
      descricao: req.body.descricao,
      estoque: req.body.estoque,
      preco: req.body.preco
    }

    // Verifica se o produto foi encontrado
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
      
    }else{
      db.produto.update(info);
    }

    // Define o cabeçalho de autorização na resposta
    res.set("Authorization", `Bearer ${token}`);

    // Retorna uma resposta de sucesso em formato JSON, incluindo o token
    res.status(200).json({auth: true, token });

    

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// Exporta o objeto 'produtoController' para ser utilizado em outros arquivos
module.exports = produtoController;

// Para criar um novo controller baseado neste exemplo, siga estes passos:
// 1. Crie um novo arquivo, como 'novoController.js'.
// 2. Copie este conteúdo para o novo arquivo.
// 3. Modifique as funções conforme necessário para atender aos requisitos específicos do novo controller.
// 4. Use o novo controller em outros arquivos, importando e utilizando-o da mesma forma que este exemplo.