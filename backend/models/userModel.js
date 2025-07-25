const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordHistory: {
        type: [String],
        default: [],
    },

    passwordLastChanged: {
        type: Date,
        default: Date.now,
    },

    isDoctor: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    seenNotifications: {
        type: Array,
        default: [],
    },
    unseenNotifications: {
        type: Array,
        default: [],
    },
    mfaSecret: { type: String },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Number, default: 0 },
    mfaEnabled: { type: Boolean, default: false }
}, {
    timestamps: true,
});

userSchema.methods.isPasswordExpired = function (expiryDays = 90) {
    if (!this.passwordLastChanged) return true;
    const expiryDate = new Date(this.passwordLastChanged);
    expiryDate.setDate(expiryDate.getDate() + expiryDays);
    return new Date() > expiryDate;
};

const userModel = mongoose.model("usershb", userSchema);

module.exports = userModel;