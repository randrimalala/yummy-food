// utils/notification.js
let ioInstance = null;

function setSocketInstance(io) {
  ioInstance = io;
}

function notifyAdmins(notification) {
  if (!ioInstance) {
    console.warn("Socket.IO non initialisé");
    return;
  }
  ioInstance.emit("notification", notification);
}

module.exports = {
  setSocketInstance,
  notifyAdmins,
};
