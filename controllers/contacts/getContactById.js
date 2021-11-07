const { NotFound } = require('http-errors')
const {Contact} = require('../../models')


const getContactById = async(req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findOne({ _id: contactId })
        if (result === null) {
            throw new NotFound
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }}


module.exports = getContactById;