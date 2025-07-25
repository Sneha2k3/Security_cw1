const winston = require("winston");
const MongoDB = require("winston-mongodb");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.MongoDB({
            db: process.env.MONGODB_URI || 'mongodb://localhost:27017/activity_logs',
            collection: 'activity_logs',
            level: 'info',
            storeHost: true,
            capped: true,
            cappedMax: 1000000 
        }),
        new winston.transports.File({ filename: 'activity.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ]
});

module.exports = logger;