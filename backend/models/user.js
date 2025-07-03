class User {
  constructor(username = null, isAnonymous = false) {
    this.userId = this.generateId("user"); // Auto-ID
    this.username = username || `Guest${Math.floor(Math.random() * 9000) + 1000}`;
    this.isAnonymous = isAnonymous;
    this.joinedRooms = [];
  }

  generateId(prefix) {
    return `${prefix}-${Math.random().toString(36).substr(2, 8)}`;
  }

  joinRoom(roomId) {
    if (!this.joinedRooms.includes(roomId)) {
      this.joinedRooms.push(roomId);
    }
  }

  leaveRoom(roomId) {
    this.joinedRooms = this.joinedRooms.filter(id => id !== roomId);
  }

  getRooms() {
    return this.joinedRooms;
  }
}
