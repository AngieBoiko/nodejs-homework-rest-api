const listContacts=require('./listContacts');
const getContactById=require('./getContactsById');
const removeContact=require('./removeContact');
const addContact=require('./addContact');
const updateContact=require('./updateContact');

const operations={listContacts,getContactById,removeContact,addContact,updateContact};

module.exports=operations;