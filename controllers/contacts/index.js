const getAllContacts = require('./getAllContacts')
const getContactById = require('./getContactById')
const removeContact = require('./removeContact')
const addContact = require('./addContact')
const updateContact = require('./updateContact')

const operations = { getAllContacts, getContactById, removeContact, addContact, updateContact }

module.exports = operations
