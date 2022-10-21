const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


// middlewares
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/user.route')
const jobRoutes = require('./routes/job.route')

app.get("/", (req, res, next) => {
    res.send("Server is Running...")
})

app.use("/user", userRoutes)
app.use("/", jobRoutes)


module.exports = app;