# Just Us 💬 — Private Chat App

A colorful private chat room for exactly 2 people. No accounts needed!

## Features
- 🔒 Private rooms — only 2 people can join each room
- ⚡ Real-time messaging with WebSockets
- ✍️ Typing indicators
- 🎲 Random room code generator
- 🎨 Colorful dark theme

## How to Run Locally

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Open your browser at: http://localhost:3000

## How to Use

1. Enter your name
2. Click **"Create New Room"** to get a random secret code
3. Share that code with your friend
4. Your friend opens the same URL, enters their name, types the code, and clicks **"Join Room"**
5. Once both of you are in — chat begins! No one else can join.

## How to Deploy (Free Hosting)

### Option A: Railway (Recommended)
1. Go to https://railway.app and sign up (free)
2. Click "New Project" → "Deploy from GitHub"
3. Push this folder to a GitHub repo first, then connect it
4. Railway auto-detects Node.js and deploys it
5. You get a public URL like: https://your-app.railway.app

### Option B: Render
1. Go to https://render.com and sign up (free)
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Set start command to: `node server.js`
5. Deploy — you get a free public URL

### Option C: Run on your own computer
- Both people need to be on the same WiFi network
- Find your local IP: run `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Share this URL with your friend: http://YOUR_IP:3000

## File Structure
```
chat-app/
├── server.js       ← Backend (Node.js + Socket.io)
├── package.json    ← Dependencies
└── public/
    └── index.html  ← Frontend (chat UI)
```
