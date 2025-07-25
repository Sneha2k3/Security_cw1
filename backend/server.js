const express = require("express");
const cors = require('cors');
const connectdb = require("./config/dbConfig");
const activityLogger = require("./middlewares/activityLogger");
require('dotenv').config()

const app = express();

connectdb();
app.use(activityLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorsRoute = require("./routes/doctorsRoute");
const port = process.env.PORT || 5000;

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorsRoute);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})