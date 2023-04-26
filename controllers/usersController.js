const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select().lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

const getOneUser = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username }).lean().exec();
  if (!user) {
    return res.status(409).json({ massage: "user do not exist" });
    //console.log(user)
  } else {
    return res.json(user);
  }
});

const createNewUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, username, password, gender, phone } = req.body;
  const bookings = [];

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "duplicate email" });
  }

  const userObject = { email, username, password, gender, phone, bookings };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(400).json({ messgae: `Invalid user data received` });
  }
});
const addNewBooking = asyncHandler(async (req, res) => {
  const { newBookingList, email } = req.body;
  const user = await User.findOne({ email }).lean().exec();
  user.bookings = newBookingList;
  const updatedUser = await user.save();
  res.json(updatedUser);
});
module.exports = {
  getAllUsers,
  createNewUser,
  getOneUser,
  addNewBooking,
};
