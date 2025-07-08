const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const SECRET_KEY = "I-solemnly-swear-that-I-am-up-to-no-good"; // store in .env for production

exports.signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: "Username already taken" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    userId: "user-" + uuidv4().slice(0, 8),
    username,
    password: hashedPassword,
    isAnonymous: false
  });

    await user.save();

    const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "2h" });
    res.status(201).json({ token, userId: user.userId, username });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "2h" });
    res.json({ token, userId: user.userId, username: user.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
