const mongoose = require('mongoose');
require('dotenv').config();

const app = require("./app");

// Database Connection
mongoose.connect(process.env.DATABASE).then(()=> {
    console.log("Database Connection Successful")
})

const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log(`App is running on port ${port}`)
})