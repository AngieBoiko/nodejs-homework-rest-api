const { NotFound, BadRequest } = require('http-errors')
const { Contact } = require('../../models')

const updateContactStatus = async(req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = req.body
    if (contact.favorite === undefined) {
      throw new BadRequest('missing field favorite')
    }
    const updateContact = { ...contact, favorite: true }
    const result = await Contact.findByIdAndUpdate(contactId, updateContact, { returnDocument: 'after' })
    if (result === null) {
      throw new NotFound()
    }
    res.status(200).json({
      status: 'success',
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContactStatus
