const express = require('express');
const router = express.Router();
const Tarefa = require('../models/task');

// Inserir
router.post('/task', async (req, res) => {
  try {
    const nova = await Tarefa.create({ titulo: req.body.titulo });
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todas
router.get('/tasks', async (req, res) => {
  const tarefas = await Tarefa.findAll();
  res.json(tarefas);
});

// Buscar por ID
router.get('/task/:id', async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  tarefa ? res.json(tarefa) : res.status(404).json({ message: 'Tarefa não encontrada' });
});

// Atualizar
router.put('/task/:id', async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (tarefa) {
    tarefa.titulo = req.body.titulo;
    await tarefa.save();
    res.json(tarefa);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

// Deletar
router.delete('/task/:id', async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (tarefa) {
    await tarefa.destroy();
    res.json({ message: 'Tarefa apagada com sucesso' });
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

module.exports = router;
