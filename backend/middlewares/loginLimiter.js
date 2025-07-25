const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many login attempts from this IP, please try again later.'
});
  