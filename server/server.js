const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3001;
const db = require('./models');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const produtoController = require('./controllers/produtoController');

// Middleware para análise do corpo da solicitação
app.use(bodyParser.json({ limit: '200mb' }));

// Use o middleware cors
app.use(cors({ origin: 'http://localhost:3000' }));

// Rota para o formulário de registro
app.post('/api/usuario/registrar', userController.register);
app.post('/api/login', userController.login);

app.post('/api/produto/cadastrar', produtoController.cadastrar);
app.delete('/api/produto/remover/:id', produtoController.remover_produto);
app.post('/api/produto/editar/:id', produtoController.editar_produto);
app.get('/api/produto/todos', produtoController.mostrar_produtos);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Rodando na porta: ${port}`);
  });
});

app.get('/', (req, res) => {
  res.send('Bem-vindo à API');
});