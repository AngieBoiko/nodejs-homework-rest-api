const fs = require("fs/promises");
const contacts = require("./contacts.json");
const contactsPath = require("./contactsPath");


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  };
  
  module.exports=listContacts;