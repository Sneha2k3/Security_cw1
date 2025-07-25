const { v4: uuidv4 } = require('uuid');
const os = require('os');
const logger = require('../config/logger'); 
const ActivityLog = require('../models/ActivityLog');
const logError = async (error, userId, action, resource) => {
  const errorLog = {
    logId: uuidv4(),
    userId: userId || 'system',
    action,
    resource,
    status: 'failed',
    error: error.message,
    stack: error.stack,
    hostname: os.hostname()
  };

  try {
    logger.error('Application error', errorLog);
    await ActivityLog.create(errorLog);
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }
};

const queryLogs = async (filters, options = {}) => {
  try {
    const { startDate, endDate, userId, action, resource, status } = filters;
    const query = {};

    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (userId) query.userId = userId;
    if (action) query.action = action;
    if (resource) query.resource = resource;
    if (status) query.status = status;

    return await ActivityLog.find(query)
      .sort({ timestamp: -1 })
      .skip(options.skip || 0)
      .limit(options.limit || 100)
      .lean();
  } catch (error) {
    logger.error('Failed to query logs', { error: error.message });
    throw error;
  }
};

module.exports = [
    queryLogs,
    logError
]