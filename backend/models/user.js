class User {
  constructor(id, username, email) {
    this.id = id;                 // Unique user ID
    this.username = username;     // Display name
    this.email = email;           // Email (optional)
    this.joinedRooms = [];        // List of room IDs the user has joined
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
