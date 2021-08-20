const User = require("../models/User");
exports.getAllUser = async (req, res, next) => {
  const users = await User.find();
  res.json({ users });
};
exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.json({ user });
};
exports.addUser = async (req, res, next) => {
  await User.create(req.body);
  res.json({ message: "user has been added" });
};
