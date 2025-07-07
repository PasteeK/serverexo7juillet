const User = require('../schemas/users');

const getAllUsers = async () => {
  return await User.find();
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUserById,
};
