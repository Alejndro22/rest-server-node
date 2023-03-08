import * as path from 'path';
import * as fs from 'fs';
import { response } from 'express';
import { fileURLToPath } from 'url';
import { uploadFile } from '../helpers/index.js';
import { Product, User } from '../models/index.js';

const upload = async (req, res = response) => {
  try {
    const newExtensions = ['text/plain', 'text/markdown'];
    const fileName = await uploadFile(req.files, newExtensions, 'texts');
    res.json({ fileName });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImage = async (req, res = response) => {
  const { collection, id } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({ msg: `Theres no user with id ${id}` });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({ msg: `Theres no product with id ${id}` });
      }
      break;

    default:
      return res.json({
        msg: 'This collection was not expected, not validation for this',
      });
  }

  // Before uploading file, delete prev img
  try {
    if (model.img) {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const imgPath = path.join(__dirname, '../uploads', collection, model.img);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
  } catch (error) {
    console.log(error);
  }

  const fileName = await uploadFile(req.files, undefined, collection);
  model.img = fileName;
  await model.save();

  res.json({
    model,
  });
};

const showImage = async (req, res = response) => {
  const { collection, id } = req.params;
  let model;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({ msg: `Theres no user with id ${id}` });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({ msg: `Theres no product with id ${id}` });
      }
      break;

    default:
      return res.json({
        msg: 'This collection was not expected, not validation for this',
      });
  }

  // Before uploading file, delete prev img
  try {
    if (model.img) {
      const imgPath = path.join(__dirname, '../uploads', collection, model.img);
      if (fs.existsSync(imgPath)) {
        return res.sendFile(imgPath);
      }
    }
  } catch (error) {
    console.log(error);
  }

  const imgPath = path.join(__dirname, '../assets', 'no-image.jpg');
  res.sendFile(imgPath);
};

export { upload, updateImage, showImage };
