const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/contacts')
const { validation } = require('../../middlewares/contacts')
const { authentication } = require('../../middlewares/users')
const { contactJoiSchema } = require('../../models')

router.get('/', authentication, controllers.getAllContacts)
router.get('/:contactId', authentication, controllers.getContactById)
router.post('/', authentication, validation(contactJoiSchema), controllers.addContact)
router.delete('/:contactId', authentication, controllers.removeContact)
router.put('/:contactId', authentication, validation(contactJoiSchema), controllers.updateContact)
router.patch('/:contactId/favorite', authentication, validation(contactJoiSchema), controllers.updateContactStatus)

module.exports = router
