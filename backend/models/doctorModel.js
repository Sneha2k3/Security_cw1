const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    website: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    feePerCunsultation: {
        type: Number,
        required: true,
    },
    timings: {
        type: Array,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    }
}, {
    timestamps: true,
}

);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;