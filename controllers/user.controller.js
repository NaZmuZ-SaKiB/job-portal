const { signupService, findUserByEmail, getMeService } = require("../services/user.service")
const { generateToken } = require("../utils/token")

exports.signup = async (req, res, next) => {
    try {
        const user = await signupService(req.body)

        res.status(200).json({
            status: "success",
            message: "successfully created a user",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "couldn't create a user",
            error
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(401).json({
                status: "fail",
                message: "Please Provide your credentials"
            })
        }

        const user = await findUserByEmail(email)
        if(!user){
            return res.status(401).json({
                status: "fail",
                message: "No user found. Please create an account first"
            })
        }

        const isPassValid = user.comparePassword(password, user.password)
        if(!isPassValid){
            return res.status(403).json({
                status: "fail",
                message: "Invalid Credentials "
            })
        }

        const {password: pwd, ...others} = user.toObject()

        const token = generateToken(user)
        res.status(200).json({
            status: "success",
            message: "Successfully logged in.",
            data: {user: others, token}
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Could not log in.",
            error
        })
    }
}

exports.getMe = async (req, res, next) => {
    try {
        const user = await getMeService(req.user.id)

        res.status(200).json({
            status: "success",
            message: "successfully got the user",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "could not get the user",
            data: user
        })
    }
}