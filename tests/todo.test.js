const request = require('supertest');
const app = require('../src/app');


describe('API de Tareas', () => {
it('debería crear una tarea', async () => {
const res = await request(app)
.post('/todos')
.send({ title: 'Hacer x tarea' });
expect(res.statusCode).toBe(201);
expect(res.body).toHaveProperty('id');
expect(res.body.title).toBe('Hacer x tarea');
});


it('debería listar tareas', async () => {
const res = await request(app).get('/todos');
expect(res.statusCode).toBe(200);
expect(Array.isArray(res.body)).toBe(true);
});
});

describe('Actualizar tareas', () => {
  it('debería actualizar el título de una tarea existente', async () => {
    // 1. Creamos una tarea primero
    const resCrear = await request(app)
      .post('/todos')
      .send({ title: 'Tarea original' });

    const id = resCrear.body.id;

    // 2. Hacemos PUT para actualizar el título
    const resActualizar = await request(app)
      .put(`/todos/${id}`)
      .send({ title: 'Tarea actualizada' });

    // 3. Comprobamos el resultado
    expect(resActualizar.statusCode).toBe(200);
    expect(resActualizar.body.title).toBe('Tarea actualizada');
    expect(resActualizar.body.id).toBe(id);
  });

  it('debería devolver 404 si la tarea no existe', async () => {
    const res = await request(app)
      .put('/todos/9999')
      .send({ title: 'No existe' });

    expect(res.statusCode).toBe(404);
  });
});