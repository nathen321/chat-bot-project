// 📁 backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route files
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
// const messageRoutes = require("./routes/messageRoutes"); // optional

const app = express();
const PORT = process.env.PORT || 5000;

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🌍 MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/chatbox", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// 📦 Routes
app.use("/api/users", userRoutes);   // /create
app.use("/api/rooms", roomRoutes);   // /create
// app.use("/api/messages", messageRoutes); // optional if messages are implemented

// 🔁 Health check
app.get("/", (req, res) => {
  res.send("ChatBox API is running");
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
