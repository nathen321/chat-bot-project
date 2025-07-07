const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  createdBy: { type: String, required: true },
  participants: [String],
  messages: [
    {
      senderId: String,
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema);
