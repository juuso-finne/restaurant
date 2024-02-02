const express = require('express');
const {getMenuItems} = require('../controllers/menu');
const {postMenuItem} = require('../controllers/menu');

const router = express.Router();

module.exports = router;

router.get('/', getMenuItems);
router.post('/', postMenuItem);