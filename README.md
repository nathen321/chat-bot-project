# 🤖 Chat-Bot Project

A real-time, multi-user chat application with room support and user authentication — built using **Node.js**, **Express**, **MongoDB**, and **WebSocket**. Users can sign up or log in (including anonymously), create or join chat rooms, and exchange live messages in real time.

## 🚀 Features

- 🔐 **User authentication** (signup, login, anonymous access)
- 💬 **Create & join chat rooms** via room ID
- 🧑‍🤝‍🧑 **Multi-user real-time messaging** (via native WebSocket)
- 🧠 **Memory-based room and user management**
- 🗃️ **MongoDB** integration for user persistence
- ⚡ **Fast, modular Express.js backend**
- 📦 Easily extensible with REST API and WebSocket handlers

## 🧪 Tech Stack

| Layer         | Technology           |
|---------------|----------------------|
| Frontend      | HTML, JS, CSS        |
| Backend       | Node.js, Express     |
| Real-time     | WebSocket (`ws`)     |
| Database      | MongoDB + Mongoose   |
| Auth          | JWT, bcrypt          |

## 🖼️ Project Structure

```
chat-bot-project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── wsServer.js
├── frontend/
│   ├── index.html
│   ├── rooms.html
│   ├── chat.html
│   └── script.js
└── README.md
```

## 🔧 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/nathen321/chat-bot-project
cd chat-bot-project
```

2. **Install dependencies**

```bash
cd backend
npm install
```

3. **Start servers**

```bash
# In one terminal (Express API)
node app.js

# In another terminal (WebSocket server)
node wsServer.js
```

4. **Open frontend**

Use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or run from local file system:
```
frontend/index.html
```

## 📌 Roadmap Ideas

- [ ] Store messages in MongoDB
- [ ] Add avatars or colors per user
- [ ] Display user presence (online/offline)
- [ ] Add voice or emoji support

## 🤝 Contributing

Contributions welcome! Feel free to fork, improve, or file issues.

## 📄 License

MIT © [nathen321](https://github.com/nathen321)
