const User = require("../models/userModel");

exports.checkLockout = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (user && user.lockUntil > Date.now()) {
      return res.status(403).json({ 
        error: `Account locked. Try again in ${Math.round((user.lockUntil - Date.now()) / 60000)} minutes` 
      });
    }
    next();
  };