const express = require('express');
const app = express();

app.use(express.json());

let todos = [];
let id = 1;

// Crear tarea
app.post('/todos', (req, res) => {
  const todo = { id: id++, title: req.body.title };
  todos.push(todo);
  res.status(201).json(todo);
});

// Listar tareas
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Actualizar tarea
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  todo.title = req.body.title;
  res.status(200).json(todo);
});


module.exports = app;