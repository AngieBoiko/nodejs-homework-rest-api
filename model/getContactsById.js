const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  const contactsList = await listContacts()
  const contact = contactsList.find(
    (item) => Number(item.id) === Number(contactId)
  )
  if (!contact) {
    return null
  }
  return contact
}

module.exports = getContactById
