/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */



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