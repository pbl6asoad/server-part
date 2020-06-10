const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');


router.get('/signup/:login', user_controller.user_find);
router.post('/signup', user_controller.user_signup);
router.post('/login', user_controller.user_verification, user_controller.user_login);

module.exports = router;