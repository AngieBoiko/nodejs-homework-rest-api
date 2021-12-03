const { User } = require('../../models')
const { sendGrid } = require('../../utils')

const reVerification = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
        return res.status(400).json({
                message: 'missing required field email'
            })
        }
        const user = await User.findOne({ email });
        if (user.verify) {
        return res.status(400).json({
                message: 'Verification has already been passed'
            })
        }
        const mail = {
            to: email,
            subject: "Welcome and enjoy our app!Confirm your registration",
            html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Enter to confirm your email</a>`

        }
        await sendGrid(mail)
        res.status(200).json({
            message:'Verification email sent'
        })

    } catch (error) {
        next(error)
    }
}


module.exports = reVerification;