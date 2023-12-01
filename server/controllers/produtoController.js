// Importa o modelo 'User' do arquivo '../models'
const { Produto } = require("../models");

// Importa os módulos 'models', 'jsonwebtoken' e 'bcrypt'
const db = require("../models");


// Cria um objeto vazio para armazenar funções relacionadas ao controle de produtos
const produtoController = {};

// Função para cadastrar um produto
produtoController.cadastrar = async (req, res) => {
  try {
    // Obtém informações do corpo da requisição
    let info = {
      imagem:req.body.imagem,
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
    console.error("Erro no registro:", error);
    return res.status(500).json({ error: "O produto não foi registrado" });
  }
};

// Função para excluir produtos do estoque
produtoController.remover_produto = async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await db.Produto.findOne({ where: { id } });

    if (!produto) {
      return res.status(401).json({ message: "Produto não encontrado" });
    }

    await produto.destroy({where:{id:id}});


    return res.status(200).json({ message: "O produto foi excluído com sucesso!" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "O produto não foi excluído" });
  }
};

// Função para editar um produto
produtoController.editar_produto = async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await db.Produto.findOne({ where: { id } });
    if (!produto) {
      return res.status(401).json({ message: "Produto não encontrado" });
      
    }
    let info = {
      imagem:req.body.imagem,
      nome: req.body.nome,
      categoria: req.body.categoria,
      descricao: req.body.descricao,
      estoque: req.body.estoque,
      preco: req.body.preco
    }

    await produto.update(info, {where:{id:id}});
    return res.status(200).json({ message: "O produto foi editado com sucesso!" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "O produto não foi editado" });
  }
}

// Função para mostrar todos os produtos do estoque
produtoController.mostrar_produtos = async (req, res) => {
  try {
    const produtos = await db.Produto.findAll();

    return res.status(200).json(produtos);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Não foi possível executar" });
  }
};

// Exporta o objeto 'produtoController' para ser utilizado em outros arquivos
module.exports = produtoController;
