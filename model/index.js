const fs = require("fs/promises");
const contacts = require("./contacts.json");
const { v4: uuidv4 } = require("uuid");
const contactsPath = require("./contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find(
    (item) => Number(item.id) === Number(contactId)
  );
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(
    (item) => Number(item.id) === Number(contactId)
  );
  if (index === -1) {
    return null;
  }
  await contactsList.splice(index, 1);
  const updateContacts = JSON.stringify(contactsList);
  await fs.writeFile(contactsPath, updateContacts);
  return;
};

const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  const id = uuidv4();
  await contactsList.push({ id, name, email, phone });
  const newList = JSON.stringify(contactsList);
  await fs.writeFile(contactsPath, newList);
  return;
};

const updateContact = async (contactId, name, email, phone) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
