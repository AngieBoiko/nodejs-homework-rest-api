const { User } = require('../../models/index')
const { NotFound } = require('http-errors')

const verify = async (req, res, next) => {
    try {
        const { verificationToken} = req.params;
        const result = await User.findOneAndUpdate({ verificationToken },{verificationToken:null,verify:true},{new:true})
        if (!result) {
            throw new NotFound()
        }
        res.status(200).json({
            message: 'Verification successful'
        })

    }catch(error){
        next(error)
    }

}

module.exports = verify