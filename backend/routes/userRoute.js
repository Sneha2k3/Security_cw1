const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const moment = require('moment');
const { loginLimiter } = require("../middlewares/loginLimiter");
const { checkLockout } = require("../middlewares/checkLockout");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");


router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: "User already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const mfaSecret = speakeasy.generateSecret({
            name: `HealthBag:${req.body.email}`
        });
        req.body = {
            ...req.body,
            mfaSecret: mfaSecret.base32
        }

        const qrCodeUrl = await QRCode.toDataURL(mfaSecret.otpauth_url);

        const newuser = new User(req.body);
        await newuser.save();
        res.status(200).json({
            message: "User created successfully",
            success: true,
            user: {
                name: newuser.name,
                email: newuser.email,
                isDoctor: newuser.isDoctor,
                isAdmin: newuser.isAdmin,
                mfaSecret: newuser.mfaSecret,
                mfaEnabled: newuser.mfaEnabled,
                qrCodeUrl: qrCodeUrl
            }
        }
        );
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error creating user", success: false, error });
    }
});
router.get("/all-users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).select("-password");
        res.status(200).send({
            message: "Users fetched successfully",
            success: true,
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error fetching users",
            success: false,
            error,
        });
    }
})


router.post("/verify-mfa", async (req, res) => {
    const { email, mfaCode } = req.body;
    if (!email || !mfaCode) {
        return res.status(400).json({ error: 'Email and MFA code are required' });
    }
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: "User with given email not found" });
    }
    if (!mfaCode) {
        return res.status(401).json({ error: 'MFA code required' });
    }

    const isMfaValid = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: mfaCode,
        window: 1
    });

    if (!isMfaValid) {
        return res.status(401).json({ error: 'Invalid MFA code' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
        { expiresIn: "2h" });

    return res.status(200).json({
        message: 'MFA verification successful',
        success: true,
        token,
        data: {
            name: user.name,
            email: user.email,
            isDoctor: user.isDoctor,
            isAdmin: user.isAdmin,
            mfaEnabled: user.mfaEnabled,
        }
    });
})

router.post('/mfa/enable', async (req, res) => {
    try {
        const { email, enable } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.mfaEnabled = enable;
        await user.save();

        res.json({
            message: `MFA ${enable ? 'enabled' : 'disabled'}`,
            enabled: user.mfaEnabled,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ error: 'MFA update failed' });
    }
});


router.post("/login", loginLimiter, checkLockout, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user.lockUntil > Date.now()) {
            return res.status(403).json({
                error: `Account locked. Try again in ${Math.round((user.lockUntil - Date.now()) / 60000)} minutes`
            });
        }
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            user.failedLoginAttempts += 1;

            if (user.failedLoginAttempts >= LOCKOUT_THRESHOLD) {
                user.lockUntil = Date.now() + LOCKOUT_DURATION;
                user.failedLoginAttempts = 0;
            }

            await user.save();
            return res.status(401).json({
                error: 'Invalid credentials',
                attemptsLeft: LOCKOUT_THRESHOLD - user.failedLoginAttempts
            });
        }

        if (user.mfaEnabled) {
            return res.status(200).json({
                mfaRequired: true,
                email: user.email,
                success: true,
            })

        }

        user.failedLoginAttempts = 0;
        user.lockUntil = 0;

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: "2h" });
        return res.status(200).send({ message: "Login successful", success: true, data: token });

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error Logging In", success: false, error });
    }

});

router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });

        console.log(user);

        user.password = undefined;
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", sucess: false });
        } else {
            res.status(200).send({ success: true, data: user });
        }
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Error getting user info", success: false, error });
    }
})

router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
    try {
        const newdoctor = new Doctor({ ...req.body, status: "pending" });
        await newdoctor.save();
        // const adminUser = await User.findOne({isAdmin: true});

        // const unseenNotifications = adminUser.unseenNotifications;
        // unseenNotifications.push({
        //     type: "new-doctor-request",
        //     message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
        //     data: {
        //         doctorId: newdoctor._id,
        //         name: newdoctor.firstName + " " + newdoctor.lastName
        //     },
        //     onClickPath: "/admin/doctorslist"
        // })
        // console.log(unseenNotifications);
        // await User.findByIdAndUpdate(adminUser._id, {unseenNotifications});
        res.status(200).send({
            success: true,
            message: "Doctor account applied successfully",
        })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error applying doctor account", success: false });
    }
});

router.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        //Marking all notifications as seen 
        seenNotifications.push(...unseenNotifications);
        //Emptying the notifications 
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications marked as seen",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error applying doctor account", success: false, error });
    }
});

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        console.log(user);
        //deleting all user notifications
        user.seenNotifications = [];
        user.unseenNotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications deleted",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error deleting notifications", success: false });
    }
});

router.get("/get-all-approved-doctors", authMiddleware, async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: "approved" });
        console.log(doctors);
        res.status(200).send({
            message: "Doctors fetched successfully",
            success: true,
            data: doctors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
});

router.post("/book-appointment", authMiddleware, async (req, res) => {
    try {
        req.body.status = "pending";
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();//pushing notification to doctor based on his userId
        const user = await User.findOne({ _id: req.body.doctorInfo.userId });
        user.unseenNotifications.push({
            type: "new-appointment-request",
            message: `A new appointment request has been made by ${req.body.userInfo.name}`,
            onClickPath: '/doctor/appointments',
        });
        await user.save();
        res.status(200).send({
            message: "Appointment booked successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error booking appointment",
            success: false,
            error,
        });
    }
});

router.post("/check-booking-availability", authMiddleware, async (req, res) => {
    try {
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, "HH:mm").add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId;
        const appointments = await Appointment.find({
            doctorId,
            date,
            time: { $gte: fromTime, $lte: toTime },
        });
        console.log(fromTime, toTime);
        console.log(date);
        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointment not available",
                success: false,
            });
        } else {
            return res.status(200).send({
                message: "Appointment available",
                success: true,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error booking appointment",
            success: false,
            error,
        });
    }
});

router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.body.userId });
        res.status(200).send({
            message: "Appointments fetched successfully",
            success: true,
            data: appointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error getting appointments",
            success: false,
            error,
        });
    }
});

module.exports = router;
