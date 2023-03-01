import express from 'express';
import cors from 'cors';

// const express = require('express');
// var cors = require('cors');

import { dbConnection } from '../database/config.js';
import { router } from '../routes/users.js';

// const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersRoutePath = '/api/users';

    // Conectar a db
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body (JSON)
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersRoutePath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

// module.exports = Server;
export default Server;
