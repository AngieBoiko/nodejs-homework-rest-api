const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({})
    if (!result) {
      throw new NotFound()
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContacts
