const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findOneAndDelete({ _id: contactId, owner: req.user._id })
    if (result === null) {
      throw new NotFound()
    }
    res.status(200).json({ status: 'success', message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
