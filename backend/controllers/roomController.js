const RoomModel = require("../models/Room");
const Room = require("../models/Room");


exports.createRoom = async (req, res) => {
  const { createdBy } = req.body;

  if (!createdBy) {
    return res.status(400).json({ error: "Missing 'createdBy' userId" });
  }

  // Step 1: create room in memory using the class
  const newRoom = new Room(createdBy);

  // Step 2: create a document from it
  const roomDoc = new RoomModel({
    roomId: newRoom.roomId,
    createdBy: newRoom.createdBy,
    participants: newRoom.participants,
    createdAt: newRoom.createdAt
  });

  try {
    await roomDoc.save();
    res.status(201).json({
      message: "Room created",
      roomId: newRoom.roomId,
      createdBy: newRoom.createdBy
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create room" });
  }
};

// Removed duplicate import and naming conflict

exports.sendMessage = async (req, res) => {
  const { roomId, senderId, text } = req.body;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: "Room not found" });

    room.messages.push({ senderId, text }); // Mongoose handles timestamp
    await room.save();

    res.status(200).json({ message: "Message sent", room });
  } catch (err) {
    console.error("💥 Error sending message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: "Room not found" });

    res.status(200).json(room.messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to get messages" });
  }
};
