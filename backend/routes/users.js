const express = require('express');
const { loginUser, signUpUser } = require('../controllers/users');
const router = express.Router();


router.post('/signup', signUpUser);
router.post('/login', loginUser);

module.exports = router;