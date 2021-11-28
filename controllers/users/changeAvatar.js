const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../models')
const { Unauthorized } = require('http-errors')
const Jimp = require('jimp')

const avatarPublicDir = path.join(__dirname, '../../public/avatars')


const changeAvatar = async (req, res, next) => {
    const { _id } = req.user;
    const { originalname, path: tempUploadPath } = req.file;
    try {
        const fileName = `${String(_id)}_${originalname}`
        const resultPath = path.join(avatarPublicDir, String(_id), fileName)
        await fs.rename(tempUploadPath, resultPath)
        await Jimp.read(resultPath)
        .then((image) => { return image.resize(250, 250).write(resultPath) })
        .catch(error=>{throw new Error(error.message)})
              
        const image = path.join('/avatars', String(_id), fileName)
        const result = await User.findOneAndUpdate({ _id }, { avatarURL: image }, { new: true })
        if (!result) {
            throw new Unauthorized()
        }
        res.status(200).json({
            avatarURL: result.avatarURL
        })
    } catch (error) {
        await fs.unlink(tempUploadPath)
        next(error)


    }

}

module.exports = changeAvatar;