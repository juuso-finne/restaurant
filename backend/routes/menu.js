const express = require('express');
const {getMenu} = require('../controllers/menu');

const router = express.Router();

module.exports = router;

router.get('/', getMenu);