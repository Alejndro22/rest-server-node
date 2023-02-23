const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
  res.json({
    msg: 'get API - Controlador',
  });
};

const postUsers = (req = request, res = response) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: 'post API - Controlador',
    nombre,
    edad,
  });
};

// Parámetros de segmento
const putUsers = (req = request, res = response) => {
  const { id } = req.params;

  res.status(400).json({
    msg: 'put API - Controlador',
    id,
  });
};

const patchUsers = (req = request, res = response) => {
  res.status(500).json({
    msg: 'patch API - Controlador',
  });
};

// Parámetros de query
const deleteUsers = (req = request, res = response) => {
  const { q, nombre = 'No name', apiKey, page = 1, limit } = req.query;

  res.json({
    msg: 'delete API - Controlador',
    q,
    nombre,
    apiKey,
    page,
    limit,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
