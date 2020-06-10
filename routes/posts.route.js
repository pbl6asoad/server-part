const express = require('express');
const router = express.Router();    
const sosi = require('../middlewares/uploadAvatar')
const post_controller = require('../controllers/post.controller');


router.get('/', post_controller.posts_get);
router.post('/create', sosi, post_controller.post_create);
router.put('/update/:id', post_controller.post_update);
router.delete('/delete/:id', post_controller.post_delete);
router.get('/authors', post_controller.post_authors);

module.exports = router;