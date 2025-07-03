class Room {
  constructor(createdBy) {
    this.roomId = this.generateId("room");
    this.createdBy = createdBy;
    this.participants = [createdBy];
    this.messages = [];
    this.createdAt = new Date();
  }

  generateId(prefix) {
    return `${prefix}-${Math.random().toString(36).substring(2, 6)}`;
  }

  addParticipant(userId) {
    if (!this.participants.includes(userId)) {
      this.participants.push(userId);
    }
  }

  addMessage(senderId, message) {
    this.messages.push({ senderId, message, timestamp: new Date() });
  }
}

module.exports = Room;
