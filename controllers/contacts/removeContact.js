const { NotFound } = require('http-errors')
const {Contact}=require('../../models')

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result= await Contact.findByIdAndRemove(contactId)
        if(result===null){
            throw new NotFound()
        }       
        res.status(200).json({ status: 'success', message: 'contact deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = removeContact
