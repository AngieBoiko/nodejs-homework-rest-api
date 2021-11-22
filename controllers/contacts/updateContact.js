const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findOneAndUpdate({_id:contactId,owner:req.user._id}, req.body, { returnDocument: 'after' })
    if (result === null) {
      throw new NotFound()
    }
    res.status(200).json({
      status: 'success',
      data: {
        result
      }
    })
  } catch (error) { next(error) }
}

module.exports = updateContact
