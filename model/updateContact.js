const fs = require("fs/promises");
const listContacts=require('./listContacts');
const contactsPath = require("./contactsPath");

const updateContact = async (contactId, data) => {
  console.log(contactId)
    const contactsList = await listContacts();
    const index = contactsList.findIndex(
      (item) => String(item.id) === contactId)
    if (index === -1) {
      return null;
    }
    const contactBeforeUpdate={...contactsList[index]};
    contactsList[index] = {...contactBeforeUpdate,...data };
    const updateList=JSON.stringify(contactsList)
    await fs.writeFile(contactsPath,updateList);
    return contactsList[index];
    };

    module.exports=updateContact;
