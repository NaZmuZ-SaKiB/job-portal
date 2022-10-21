const mongoose = require('mongoose')
const validator = require('validator')

const jobShcema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Job title is required"],
        unique: true,
        trim: true
    },
    salary: {
        type: Number,
        required: [true, "Salary is required (min: 10,000)"],
        min: [10000, "Salary must be mininum 10,000"]
    },
    location: {
        type: String,
        required: [true, "location is required"]
    },
    description: {
        type: String,
        required: [true, "Job description is required"]
    },
    jobType: {
        type: String,
        required: [true, "Job type is required (full-time/ part-time)"],
        enum: ["full-time", "part-time"]
    },
    educationalRequirement: {
        type: String,
        required: [true, "Educational requirement is required"]
    },
    hiringManager:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Hiring manager is required"]
    },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    deadline: {
        type: Date,
        required: [true, "Deadline Date is required"]
    }
}, {
    timestamps: true
})

const Job = mongoose.model('Job', jobShcema)

module.exports = Job