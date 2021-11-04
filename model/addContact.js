const fs = require('fs/promises')
const listContacts = require('./listContacts')
const { v4: uuidv4 } = require('uuid')
const contactsPath = require('./contactsPath')

const addContact = async ({ name, email, phone }) => {
  const contactsList = await listContacts()
  const id = uuidv4()
  const newContact = { id, name, email, phone }
  await contactsList.push(newContact)
  const newList = JSON.stringify(contactsList)
  await fs.writeFile(contactsPath, newList)
  return newContact
}

module.exports = addContact
