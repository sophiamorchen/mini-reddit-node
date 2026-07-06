const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const { getCommentsForLink, createComment } = require("../controllers/commentController");
const protect = require('../middleware/auth');


/**
 * Routes CRUD pour les liens
  * CRUD = Create, Read, Update, Delete
**/

router.get('/', linkController.getAllLinks); // /api/links
router.post('/', protect, linkController.createLink); // api/links/1
router.get('/:id', linkController.getLinkById); 
router.put('/:id', protect, linkController.updateLinkById); 
router.delete('/:id', protect, linkController.deleteLinkById); 

//Routes commentaires
router.get('/:id/comments', getCommentsForLink);
router.post('/:id/comments', protect, createComment);

// EXPORTS = ici signifie qu'on exporte le router dans le SYSTEME(/ DANS LA CONFIGURATION) DU SERVEUR EXPRESS nos différentes routes, ce n'est pas le même export que celui dans le controller exports. ...
module.exports = router;
