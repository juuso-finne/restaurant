const express = require('express');
const {
    getMenuItems,
    postMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/menu');


const router = express.Router();

module.exports = router;

router.get('/', getMenuItems);
router.post('/', postMenuItem);
router.put('/:id', updateMenuItem)
router.delete('/:id', deleteMenuItem);