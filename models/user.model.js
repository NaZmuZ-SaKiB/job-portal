const mongoose =require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        required: [true, "Email address is required"],
        unique:  true
    },
    password: {
        type: String,
        required: [true, "A password is required"]
    },
    role: {
        type: String,
        enum: ["candidate", "hiring-manager", "admin"],
        default: "candidate"
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"]
    },
    address: String,
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }]
}, {timestamps: true})


userSchema.pre("save", function(next) {
    const password = this.password
    const hashedPassword = bcrypt.hashSync(password, )

    this.password = hashedPassword 
    next()
})

userSchema.methods.comparePassword = function(password, hash) {
    const isPassValid = bcrypt.compareSync(password, hash)
    return isPassValid;
}


const User = mongoose.model("User", userSchema)

module.exports = User;