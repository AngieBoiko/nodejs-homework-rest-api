const { BadRequest } = require('http-errors')
const { Contact } = require('../../models')

const addContact = async (req, res, next) => {
    try {
        const newContact = await Contact.create(req.body)
        res.status(201).json({
            status: 'success',
            code:201,
            data: {
                newContact
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = addContact;