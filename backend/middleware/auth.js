const jwt = require("jsonwebtoken");
const SECRET_KEY = "I-solemnly-swear-that-I-am-up-to-no-good";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};
