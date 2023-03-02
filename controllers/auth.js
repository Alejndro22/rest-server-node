import { response } from 'express';
import bcryptjs from 'bcryptjs';
import Users from '../models/user.js';
import { generateJWT } from '../helpers/generate-jwt.js';

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    // Verify if email is registered
    if (!user)
      return res.status(400).json({
        msg: `Email: ${email} is not registered in DB`,
      });

    // Verifiy if user state is active (true)
    if (!user.state)
      return res.status(400).json({
        msg: `User state is false (DELETED)`,
      });

    // Check password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        msg: `Wrong password`,
      });

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
};

export { login };
