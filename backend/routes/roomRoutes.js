const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.post("/create", roomController.createRoom);
router.post("/message", roomController.sendMessage);
router.get("/:roomId/messages", roomController.getMessages);

module.exports = router;
