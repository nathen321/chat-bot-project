const RoomModel = require("../models/room");
const Room = require("../classes/room");

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
