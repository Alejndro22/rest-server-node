const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');

const getUsers = (req = request, res = response) => {
  res.json({
    msg: 'get API - Controlador',
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const usuario = new Usuario({ name, email, password, role });

  // Verify if mail exists

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await usuario.save();

  res.status(201).json({
    msg: 'post API - Controlador',
    usuario,
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
