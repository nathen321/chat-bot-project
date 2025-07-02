class Room {
  constructor(roomId, createdBy) {
    this.roomId = roomId;         // Unique room identifier
    this.createdBy = createdBy;   // User ID of the creator
    this.participants = [];       // List of user IDs
    this.messages = [];           // Array of message objects { senderId, message, timestamp }
  }

  addParticipant(userId) {
    if (!this.participants.includes(userId)) {
      this.participants.push(userId);
    }
  }

  removeParticipant(userId) {
    this.participants = this.participants.filter(id => id !== userId);
  }

  addMessage(senderId, message) {
    const msg = {
      senderId,
      message,
      timestamp: new Date()
    };
    this.messages.push(msg);
  }

  getMessages() {
    return this.messages;
  }

  getParticipants() {
    return this.participants;
  }
}
