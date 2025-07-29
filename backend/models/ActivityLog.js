const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const os = require('os');
const activityLogSchema = new mongoose.Schema({
  logId: { type: String, default: uuidv4, unique: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  username: { type: String },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String },
  userAgent: { type: String },
  status: { type: String, enum: ['success', 'failed'], required: true },
  error: { type: String },
  sessionId: { type: String },
  hostname: { type: String, default: os.hostname() }
}, {
  timestamps: true
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

