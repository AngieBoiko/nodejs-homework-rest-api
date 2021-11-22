const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const {SECRET_KEY} = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            throw new Unauthorized('Email or password is wrong')
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "4h" });
        await User.findByIdAndUpdate(user._id, { token })
        res.status(200).json({
            token,
            user: {
                email,
                subscription: user.subscription

            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = login;