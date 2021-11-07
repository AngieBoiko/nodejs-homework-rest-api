const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/contacts')
const { validation } = require('../../middlewares/contacts')
const { contactJoiSchema } = require('../../models')

router.get('/', controllers.getAllContacts)
router.get('/:contactId', controllers.getContactById)
router.post('/', validation(contactJoiSchema), controllers.addContact)
router.delete('/:contactId', controllers.removeContact)
router.put('/:contactId', validation(contactJoiSchema), controllers.updateContact)
router.patch('/:contactId/favorite', validation(contactJoiSchema), controllers.updateContactStatus)

module.exports = router
