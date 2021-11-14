const { contactSchema, Contact, contactJoiSchema } = require('./contact/contact')
const { userSchema, userJoiSchema,User } = require('./user/user')

module.exports = { Contact, contactSchema, contactJoiSchema, userJoiSchema,userSchema,User }
