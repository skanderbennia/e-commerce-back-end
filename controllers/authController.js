const User = require("../models/User");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ id: id }, "mysecretpassword", { expiresIn: "1h" });
};
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);
  if (!email || !password) {
    return res.json({
      status: 404,
      message: "please provide email and password",
    });
  }
  const currentUser = await User.findOne({ email: email }).select("+password");
  console.log(currentUser);
  if (!currentUser || !currentUser.password)
    return res.json({ status: 404, message: "incorrect email or password " });
  const token = signToken(currentUser._id);
  res.status(200).json({
    status: "success",
    token,
    userInformation: currentUser,
  });
};
exports.addUser = async (req, res, next) => {
  const newUser = await User.create({
    name: "Admin Admin",
    email: "admin@gmail.com",
    password: "admin123",
  });
  res.json({
    status: 200,
    user: newUser,
  });
};
