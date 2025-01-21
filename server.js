const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const admin = require("firebase-admin");

app.use(cors());
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountPath) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set"
  );
}
const serviceAccountCred = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCred),
});

const hostname = "192.168.4.28";
const port = 3000;
const socketPort = 3001;
const io = new Server(socketPort, {
  cors: {
    origin: `http://${hostname}:${socketPort}`,
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);
  // Send and get message
  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    var title = sender_username;
    var body = message;
    var token = fcm;
    const Message = {
      notification: {
        title,
        body,
      },
      android: {
        notification: {
          channel_id: "MESSAGE_CHANNEL", // *
          icon: "message_icon", // *
          tag: "message", // *
        },
      },
      apns: {
        payload: {
          aps: {
            sound: "chime.caf",
          },
        },
      },
      data: {
        click_action: "FLUTTER_NOTIFICATION_CLICK", // *
        type: "MESSAGE",
        username: sender_username, // *
      },
      token,
    };
    if (fcm !== null && fcm !== "") {
      admin.messaging().send(Message);
    }
    io.to(data["roomId"]).emit("receive_message", data);
  });

  socket.on("join_channel", (channel) => {
    socket.join(channel);
    console.log(`User ${socket.id} joined channel ${channel}`);
  });
  socket.on("leave_channel", (channel) => {
    socket.leave(channel);
    console.log(`User ${socket.id} left channel ${channel}`);
  });

  // When Disconnect
  socket.on("disconnected", (socket) => {
    console.log("The user is disconnected from the server");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
