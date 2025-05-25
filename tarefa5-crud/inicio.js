const express = require('express');
const sequelize = require('./config/database');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();
app.use(express.json());
app.use('/', tarefaRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});
