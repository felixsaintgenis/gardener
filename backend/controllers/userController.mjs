import User from '../models/userModel.mjs';

//login user
export const loginUser = async (req, res) => {
  res.json({ msg: 'User is logged' });
};

//signup user
export const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
