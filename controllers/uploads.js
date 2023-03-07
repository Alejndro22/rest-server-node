import { response } from 'express';
import { uploadFile } from '../helpers/index.js';

const upload = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }

  try {
    const newExtensions = ['text/plain', 'text/markdown'];
    const fileName = await uploadFile(req.files, newExtensions, 'texts');
    res.json({ fileName });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

export { upload };
