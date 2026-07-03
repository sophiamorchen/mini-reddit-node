const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
/**
 * Routes CRUD pour les liens
  * CRUD = Create, Read, Update, Delete
**/

router.get('/', linkController.getAllLinks); // /api/links
router.post('/', linkController.createLink); // api/links/1
router.get('/:id', linkController.getLinkById); 
router.put('/:id', linkController.updateLinkById); 
router.delete('/:id', linkController.deleteLinkById); 


// EXPORTS = ici signifie qu'on exporte le router dans le SYSTEME(/ DANS LA CONFIGURATION) DU SERVEUR EXPRESS nos différentes routes, ce n'est pas le même export que celui dans le controller exports. ...
module.exports = router;
