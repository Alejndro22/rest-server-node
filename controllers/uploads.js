import { response } from 'express';
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

  const fileName = await uploadFile(req.files, undefined, collection);
  model.img = fileName;
  await model.save();

  res.json({
    model,
  });
};

export { upload, updateImage };
