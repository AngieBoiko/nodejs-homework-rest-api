const getAllContacts = require('./getAllContacts')
const getContactById = require('./getContactById')
const removeContact = require('./removeContact')
const addContact = require('./addContact')
const updateContact = require('./updateContact')
const updateContactStatus = require('./updateContactStatus')

const operations = { getAllContacts, getContactById, removeContact, addContact, updateContact, updateContactStatus }

module.exports = operations
