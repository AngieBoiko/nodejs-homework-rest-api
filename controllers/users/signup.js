const { User } = require('../../models')
const {sendMail}=require('../../utils')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const avatarPublicDir = path.join(__dirname, '../../public/avatars')

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }
    const avatarURL = gravatar.url(email)
    const verificationToken=uuidv4()
    const newUser = new User({ email, avatarURL,verificationToken })
    newUser.setPassword(password)
    await newUser.save()
    const email={
      to:newUser.mail,
      subject:"Welcome and enjoy our app!Confirm your registration",
      html:`<a href="http://localhost:3000/api/users/verify/${verificationToken}">Enter for confirm your email</a>`
    
    }
    await sendMail(email)
    res.status(201).json({
      user: {
        email: newUser.email,
        avatarURL,
        subscription: newUser.subscription
      }

    })
    const id = String(newUser._id)
    const publicUserAvatarDirPath = path.join(avatarPublicDir, id)
    await fs.mkdir(publicUserAvatarDirPath)
  } catch (error) {
    next(error)
  }
}

module.exports = signup
