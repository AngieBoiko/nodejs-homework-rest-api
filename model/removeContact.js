const fs = require("fs/promises");
const contactsPath = require("./contactsPath");
const listContacts=require('./listContacts');

const removeContact = async (contactId) => {
    const contactsList = await listContacts();
    const index = contactsList.findIndex(
      (item) => Number(item.id) === Number(contactId)
    );
    if (index === -1) {
      return null;
    }
    const removeContactItem= contactsList.splice(index, 1);
    const updateContacts = JSON.stringify(contactsList);
    await fs.writeFile(contactsPath, updateContacts);
    return removeContactItem;
  };

  module.exports=removeContact;