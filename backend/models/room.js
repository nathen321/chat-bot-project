class Room {
  constructor(createdBy) {
    this.roomId = this.generateId("room"); // Auto-ID
    this.createdBy = createdBy;            // Creator's userId
    this.participants = [];
    this.messages = [];
    this.createdAt = new Date();
  }

  generateId(prefix) {
    return `${prefix}-${Math.random().toString(36).substr(2, 6)}`;
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
    this.messages.push({ senderId, message, timestamp: new Date() });
  }

  getMessages() {
    return this.messages;
  }
}
