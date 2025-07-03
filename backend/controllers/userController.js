const UserModel = require("../models/user");
const User = require("../classes/user"); // importing the class

exports.createUser = async (req, res) => {
  const { username, isAnonymous = false } = req.body;

  // Step 1: create in-memory user using the class
  const newUser = new User(username, isAnonymous);

  // Step 2: create Mongoose document from class values
  const userDoc = new UserModel({
    userId: newUser.userId,
    username: newUser.username,
    isAnonymous: newUser.isAnonymous,
    joinedRooms: newUser.joinedRooms
  });

  try {
    await userDoc.save();
    res.status(201).json({
      message: "User created",
      userId: newUser.userId,
      username: newUser.username,
      isAnonymous: newUser.isAnonymous
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create user" });
  }
};
