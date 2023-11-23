# KeepStock App

(Preencher descrição depois)

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dependências](#dependências)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

1. Clone este repositório: `git clone https://github.com/andradegeovana/keepstock-app.git`
2. Navegue até o diretório do projeto: `keepstock-app`
3. Instale as dependências: `npm install`

## Uso

Antes de começar, configure corretamente seu banco de dados no arquivo `config/config.json`. Após a configuração, você pode iniciar o projeto com o seguinte comando: `npm start`

## Dependências

Este projeto utiliza as seguintes dependências:

- [bcrypt](https://www.npmjs.com/package/bcrypt): ^5.1.1
- [cors](https://www.npmjs.com/package/cors): ^2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv): ^16.3.1
- [express](https://www.npmjs.com/package/express): ^4.18.2
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): ^9.0.2
- [mysql2](https://www.npmjs.com/package/mysql2): ^3.6.5
- [nodemon](https://www.npmjs.com/package/nodemon): ^3.0.1
- [sequelize](https://www.npmjs.com/package/sequelize): ^6.35.1

```bash
Estrutura do Projeto
Explicação da estrutura de diretórios do seu projeto.

. # Código-fonte do projeto
├── controllers/           # Controladores
├── models/                # Modelos de dados  
├── server.js              # Ponto de entrada da aplicação
├── config/                # Configurações do projeto
├── .gitignore             # Arquivos/diretórios ignorados pelo Git
├── package.json           # Informações do projeto e dependências
├── README.md              # Documentação principal
└── LICENSE                # Licença do projeto
