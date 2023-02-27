const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  // const users = await User.find(query).skip(from).limit(limit);

  // const total = await User.countDocuments(query);

  // Se puede usar para lanzar peticiones asincronas de forma simultanes
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(from).limit(limit),
  ]);

  res.json({
    total,
    users,
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.status(201).json(user);
};

// Parámetros de segmento
const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, fromGoogle, email, ...remainder } = req.body;

  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    remainder.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, remainder, { new: true });

  res.status(200).json(user);
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
