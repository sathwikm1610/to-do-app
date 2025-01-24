 
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.json({ success: false, message: 'User already exists' });
  }
  const user = new User({ username, password });
  await user.save();
  res.json({ success: true, message: 'Registration successful' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.json({ success: false, message: 'Invalid credentials' });
  }
  res.json({ success: true, message: 'Login successful' });
};
