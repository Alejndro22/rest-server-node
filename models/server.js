import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { dbConnection } from '../database/config.js';
import {
  userRouter,
  authRouter,
  categoriesRouter,
  searchRouter,
  productsRouter,
  uploadsRouter,
} from '../routes/index.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
      users: '/api/users',
    };

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

    // Handle file uploads
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.categories, categoriesRouter);
    this.app.use(this.paths.products, productsRouter);
    this.app.use(this.paths.search, searchRouter);
    this.app.use(this.paths.uploads, uploadsRouter);
    this.app.use(this.paths.users, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

export default Server;
