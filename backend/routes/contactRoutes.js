const express = require('express');
const contactRouter = express.Router();
const contactController = require('../controllers/contactController');

contactRouter.route('/create-contact').post(contactController.createContact);
contactRouter.route('/fetch-contacts').get(contactController.getAllContacts);
contactRouter.route('/fetch-contacts/:id').get(contactController.getContactByID);
contactRouter.route('/edit-contact/:id').put(contactController.editContact);
contactRouter.route('/delete-contacts').delete(contactController.deleteAllContacts);
contactRouter.route('/delete-contact/:id').delete(contactController.deleteContactByID);

module.exports = contactRouter;