const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar=require('gravatar')
const fs= require('fs/promises')
const path=require('path')

const avatarPublicDir=path.join(__dirname,'../../public/avatars')

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }
    const avatarURL=gravatar.url(email)
    const newUser = new User({ email,avatarURL})
    newUser.setPassword(password)
    await newUser.save()
    res.status(201).json({
      user: {
        email: newUser.email,
        avatarURL,
        subscription: newUser.subscription
      }
      
    })
    const id=String(newUser._id);
    const publicUserAvatarDirPath=path.join(avatarPublicDir,id)
    await fs.mkdir(publicUserAvatarDirPath)
  } catch (error) {
    next(error)
  }
}

module.exports = signup
