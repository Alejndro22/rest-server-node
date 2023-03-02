import express from 'express';
import cors from 'cors';

import { dbConnection } from '../database/config.js';
import { userRouter } from '../routes/users.js';
import { authRouter } from '../routes/auth.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.usersRoutePath = '/api/users';
    this.authRoutePath = '/api/auth';

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
    this.app.use(this.authRoutePath, authRouter);
    this.app.use(this.usersRoutePath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

export default Server;
