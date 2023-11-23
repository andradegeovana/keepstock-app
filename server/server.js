const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3001;
const db = require('./models');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const produtoController = require('./controllers/produtoController');

// Middleware para análise do corpo da solicitação
app.use(bodyParser.json({ extended: true }));

// Use o middleware cors
app.use(cors({ origin: 'http://localhost:3000' }));

// Rota para o formulário de registro
app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/cadastrar', produtoController.cadastrar);
app.delete('/remover_produto', produtoController.remover_produto);
app.post('/editar_produto', produtoController.editar_produto);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Rodando na porta: ${port}`);
  });
});

app.get('/', (req, res) => {
  res.send('Bem-vindo à API');
});