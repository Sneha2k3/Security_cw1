const ActivityLog = require("../models/ActivityLog");
const { v4: uuidv4 } = require('uuid');
const os = require('os');
const logger = require('../config/logger');

const activityLogger = async (req, res, next) => {
    const start = Date.now();
    res.on('finish', async () => {
        const duration = Date.now() - start;
        const logEntry = {
            logId: uuidv4(),
            userId: req.user?.id || 'anonymous',
            username: req.user?.username || 'anonymous',
            action: req.method,
            resource: req.originalUrl,
            details: {
                params: req.params,
                query: req.query,
                body: sanitizeBody(req.body),
                duration: `${duration}ms`
            },
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            status: res.statusCode < 400 ? 'success' : 'failed',
            sessionId: req.sessionID,
            hostname: os.hostname()
        };

        try {
            logger.info('User activity', logEntry);

            await ActivityLog.create(logEntry);
        } catch (error) {
            logger.error('Failed to log activity', { error: error.message, logEntry });
        }
    });

    next();
};

const sanitizeBody = (body) => {
    const sensitiveFields = ['password', 'token'];
    const sanitized = { ...body };

    sensitiveFields.forEach(field => {
        if (sanitized[field]) {
            sanitized[field] = '[REDACTED]';
        }
    });

    return sanitized;
};

module.exports = activityLogger;