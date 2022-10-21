const User = require("../models/user.model")

exports.getMeService = async (userId) => {
    const user = await User.findById(userId).populate('appliedJobs')
    user.password = null
    return user;
}

exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo)
    return user;
}

exports.findUserByEmail = async (email) => {
    return await User.findOne({email})
}