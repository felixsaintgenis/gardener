import User from '../models/userModel.mjs';

//login user
export const loginUser = async (req, res) => {
  res.json({ msg: 'User is logged' });
};

//signup user
export const signupUser = async (req, res) => {
  res.json({ msg: 'User is signup' });
};
