// require('dotenv').config();
// const Server = require('./models/server');
import * as dotenv from 'dotenv';
import Server from './models/server.js';

dotenv.config();

const server = new Server();
server.listen();
