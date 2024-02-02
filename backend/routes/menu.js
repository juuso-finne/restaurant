const express = require('express');
const {
    getMenuItems,
    postMenuItem,
    updateMenuItem
} = require('../controllers/menu');


const router = express.Router();

module.exports = router;

router.get('/', getMenuItems);
router.post('/', postMenuItem);
router.put('/:id', updateMenuItem)