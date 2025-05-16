// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  senderRole: { type: String, enum: ['Student', 'Faculty', 'Alumni'], required: true },
  senderId: { type: String, required: true }, // Enrollment or FacultyId
  message: { type: String, required: true },
  departmentName: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
