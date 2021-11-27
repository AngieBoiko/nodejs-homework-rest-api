const { Contact } = require('../../models')

const addContact = async (req, res, next) => {
  try {
    const newBody = { ...req.body, owner: req.user._id }
    const newContact = await Contact.create(newBody)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newContact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
